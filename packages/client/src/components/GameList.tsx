import '../public/list.css'
import { type RootOutletContext } from '../routes/Root'
import { type Client } from '@games-not-played/types'
import { useEffect, useRef, useState } from 'react'
import { Link, useOutletContext } from 'react-router-dom'
import { Droppable } from '@hello-pangea/dnd'
import { CSSTransition } from 'react-transition-group'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faGamepad,
    faCaretDown,
    faCaretUp,
} from '@fortawesome/free-solid-svg-icons'
import Entry from './Entry'
import RawgAttribution from './RawgAttribution'

type Props = {
    entries: Client.Entry[] | null
}

function GameList({ entries }: Props) {
    const splitEntries = entries ? splitEntriesByPlaying(entries) : entries

    const playingEntries = splitEntries?.playing
    const [otherEntries, setOtherEntries] = useState(splitEntries?.other)

    const { currentFilter, filterDirection } =
        useOutletContext() as RootOutletContext
    const [dndDisabled, setDndDisabled] = useState(false)

    useEffect(() => {
        switch (currentFilter.state) {
            case 'custom':
                setDndDisabled(false)
                setOtherEntries(splitEntries?.other)
                break
            case 'owned':
                setDndDisabled(true)
                if (splitEntries) {
                    setOtherEntries(filterByOwned(splitEntries.other))
                }
                break
            case 'length':
                setDndDisabled(true)
                if (splitEntries) {
                    setOtherEntries(
                        filterByPlaytime(
                            splitEntries.other,
                            filterDirection.state
                        )
                    )
                }
                break
            case 'dateAdded':
                setDndDisabled(true)
                if (splitEntries) {
                    setOtherEntries(
                        filterByDateAdded(
                            splitEntries.other,
                            filterDirection.state
                        )
                    )
                }
                break
        }
    }, [currentFilter.state, entries])

    // Apply the offset to the 'other' entries' index so that the separated
    // sets of entries have one contiguous set of indexes on the backend.
    const playingIndexOffset = playingEntries?.length || 0

    const [showPlaying, setShowPlaying] = useState(true)
    const nodeRef = useRef(null)

    return (
        <>
            {playingEntries && playingEntries.length > 0 && (
                <>
                    <button
                        id="toggle-playing-btn"
                        type="button"
                        name="toggle-playing"
                        onClick={() => setShowPlaying(!showPlaying)}
                    >
                        <FontAwesomeIcon
                            icon={showPlaying ? faCaretUp : faCaretDown}
                        ></FontAwesomeIcon>
                    </button>
                    <CSSTransition
                        nodeRef={nodeRef}
                        in={showPlaying}
                        timeout={{ enter: 300, exit: 200 }}
                        classNames="playing-section"
                    >
                        <div ref={nodeRef}>
                            <Droppable
                                droppableId="playing-list"
                                type="PLAYING"
                            >
                                {(provided) => (
                                    <div
                                        ref={provided.innerRef}
                                        {...provided.droppableProps}
                                        className="list-section"
                                    >
                                        {playingEntries.map((entry, index) => (
                                            <Entry
                                                key={entry.id}
                                                index={index}
                                                entry={entry}
                                            />
                                        ))}
                                        {provided.placeholder}
                                    </div>
                                )}
                            </Droppable>
                            {playingEntries.length > 0 && <hr />}
                        </div>
                    </CSSTransition>
                </>
            )}

            {otherEntries && otherEntries.length > 0 && (
                <Droppable
                    droppableId="other-list"
                    type="OTHER"
                    isDropDisabled={dndDisabled}
                >
                    {(provided) => (
                        <div
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                            className="list-section"
                        >
                            {otherEntries.map((entry, index) => (
                                <Entry
                                    key={entry.id}
                                    index={index + playingIndexOffset}
                                    entry={entry}
                                />
                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            )}
            <Link to="/search">
                <span className="sr-only sr-only-focusable">Add Game</span>
                <FontAwesomeIcon icon={faGamepad} size="4x" />
            </Link>
            <RawgAttribution />
            <div className="list-actions">
                <Link to={'/random'} id="random-btn">
                    <button>Random</button>
                </Link>
                <Link to={'/filter'} id="filter-btn">
                    <button>Filter</button>
                </Link>
            </div>
        </>
    )
}

function splitEntriesByPlaying(entries: Client.Entry[]) {
    return entries?.reduce<{
        playing: Client.Entry[]
        other: Client.Entry[]
    }>(
        (entries, currentEntry) => {
            if (currentEntry.isPlaying) entries.playing.push(currentEntry)
            else entries.other.push(currentEntry)

            return entries
        },
        { playing: [], other: [] }
    )
}

function filterByOwned(entries: Client.Entry[]) {
    let ownedFilteredEntries = entries.reduce<{
        owned: Client.Entry[]
        notOwned: Client.Entry[]
    }>(
        (entries, currentEntry) => {
            if (currentEntry.isOwned) {
                entries.owned.push(currentEntry)
            } else {
                entries.notOwned.push(currentEntry)
            }
            return entries
        },
        { owned: [], notOwned: [] }
    )
    return ownedFilteredEntries?.owned.concat(ownedFilteredEntries?.notOwned)
}

function filterByPlaytime(entries: Client.Entry[], direction: 'asc' | 'desc') {
    const playtimeSortedEntries = Array.from(entries)

    return playtimeSortedEntries.sort((a, b) => {
        if (a.game.playtime && b.game.playtime) {
            return direction === 'asc'
                ? a.game.playtime - b.game.playtime
                : b.game.playtime - a.game.playtime
        } else if (a.game.playtime && !b.game.playtime) {
            // Always move null playtime to end.
            return -1
        } else {
            return 0
        }
    })
}

function filterByDateAdded(entries: Client.Entry[], direction: 'asc' | 'desc') {
    const playtimeSortedEntries = Array.from(entries)

    return playtimeSortedEntries.sort((a, b) => {
        if (a.createdAt > b.createdAt) {
            return direction === 'asc' ? 1 : -1
        } else {
            return direction === 'asc' ? -1 : 1
        }
    })
}

export default GameList
