import '../public/component-css/gamelist.css'
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

    const { currentFilter, filterDirection, showPlaying } =
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

    const nodeRef = useRef(null)

    return (
        <>
            {playingEntries && playingEntries.length > 0 && (
                <div
                    id="playing-section"
                    className={`list-section ${
                        showPlaying.state ? 'show-playing' : ''
                    }`}
                >
                    <button
                        id="toggle-playing-btn"
                        type="button"
                        name="toggle-playing"
                        onClick={() => showPlaying.setter(!showPlaying.state)}
                    >
                        <FontAwesomeIcon
                            icon={showPlaying.state ? faCaretUp : faCaretDown}
                        ></FontAwesomeIcon>
                    </button>
                    <CSSTransition
                        nodeRef={nodeRef}
                        in={showPlaying.state}
                        unmountOnExit
                        timeout={{ enter: 300, exit: 200 }}
                        classNames="playing-list"
                    >
                        <div ref={nodeRef}>
                            <h5 className="header">Currently Playing</h5>
                            <Droppable
                                droppableId="playing-list"
                                type="PLAYING"
                            >
                                {(provided) => (
                                    <div
                                        ref={provided.innerRef}
                                        {...provided.droppableProps}
                                    >
                                        {playingEntries.map((entry, index) => (
                                            <Entry
                                                key={entry.id}
                                                index={index}
                                                entry={entry}
                                                dndDisabled={undefined}
                                            />
                                        ))}
                                        {provided.placeholder}
                                    </div>
                                )}
                            </Droppable>
                            {playingEntries.length > 0 && <hr />}
                        </div>
                    </CSSTransition>
                </div>
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
                                    dndDisabled={dndDisabled}
                                />
                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            )}
            <div id="add-section">
                <Link to="/search">
                    <span className="sr-only sr-only-focusable">Add Game</span>
                    <FontAwesomeIcon icon={faGamepad} size="4x" />
                </Link>
                <RawgAttribution />
            </div>
            <div className="list-actions">
                <Link to={'/random'} id="random-btn">
                    <div>Random</div>
                </Link>
                <Link to={'/filter'} id="filter-btn">
                    <div>
                        <span>Filter</span>
                        {/* <span>
                            {' '}
                            {currentFilter.state.charAt(0).toUpperCase() +
                                currentFilter.state.slice(1)}
                            {(currentFilter.state === 'length' ||
                                currentFilter.state === 'dateAdded') &&
                                `[${filterDirection.state.toUpperCase()}]`}
                        </span> */}
                    </div>
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
