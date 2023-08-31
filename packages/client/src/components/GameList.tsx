import '../public/component-css/gamelist.css'
import { type RootOutletContext } from '../routes/Root'
import { type Client } from '@games-not-played/types'
import { useEffect, useRef, useState } from 'react'
import { Link, useOutletContext } from 'react-router-dom'
import { Droppable } from '@hello-pangea/dnd'
import { CSSTransition } from 'react-transition-group'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons'
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
                    <svg
                        width="93"
                        height="93"
                        viewBox="0 0 93 93"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        id="add-game-btn"
                    >
                        <rect
                            className="circle"
                            y="11"
                            width="82"
                            height="82"
                            rx="41"
                            fill="#3B383B"
                        />
                        <path
                            className="controller-btn"
                            d="M27.5 49.75H36.5"
                            stroke="#AA5042"
                            stroke-width="4"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        />
                        <path
                            className="controller-btn"
                            d="M32 45.25V54.25"
                            stroke="#AA5042"
                            stroke-width="4"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        />
                        <path
                            className="controller-btn"
                            d="M47.75 52H47.7725"
                            stroke="#AA5042"
                            stroke-width="4"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        />
                        <path
                            className="controller-btn"
                            d="M54.5 47.5H54.5225"
                            stroke="#AA5042"
                            stroke-width="4"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        />
                        <path
                            className="controller-outline"
                            d="M52.97 36.25H29.03C26.8031 36.2505 24.6555 37.0766 23.0023 38.5685C21.3491 40.0605 20.3078 42.1124 20.0795 44.3275C20.066 44.4445 20.057 44.5547 20.0412 44.6695C19.859 46.186 18.5 57.526 18.5 61C18.5 62.7902 19.2112 64.5071 20.477 65.773C21.7429 67.0388 23.4598 67.75 25.25 67.75C27.5 67.75 28.625 66.625 29.75 65.5L32.9315 62.3185C33.7752 61.4745 34.9196 61.0003 36.113 61H45.887C47.0804 61.0003 48.2248 61.4745 49.0685 62.3185L52.25 65.5C53.375 66.625 54.5 67.75 56.75 67.75C58.5402 67.75 60.2571 67.0388 61.523 65.773C62.7888 64.5071 63.5 62.7902 63.5 61C63.5 57.5238 62.141 46.186 61.9588 44.6695C61.943 44.557 61.934 44.4445 61.9205 44.3297C61.6928 42.1142 60.6516 40.0618 58.9984 38.5694C57.3451 37.077 55.1972 36.2506 52.97 36.25V36.25Z"
                            stroke="#FFFBFA"
                            stroke-opacity="0.9"
                            stroke-width="4"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        />
                        <path
                            className="plus"
                            d="M67 14V38"
                            stroke="#FFFBFA"
                            stroke-opacity="0.9"
                            stroke-width="5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        />
                        <path
                            className="plus"
                            d="M55 26H79"
                            stroke="#FFFBFA"
                            stroke-opacity="0.9"
                            stroke-width="5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        />
                    </svg>
                </Link>
                <RawgAttribution />
            </div>
            <div className="list-actions">
                <div className="container">
                    <Link to={'/random'} id="random-btn">
                        <div className="button-div">Random</div>
                    </Link>
                    <div id="filter-btn">
                        {currentFilter.state !== 'custom' && (
                            <div className="current-filter">
                                <span>
                                    Current:{' '}
                                    {currentFilter.state === 'owned' && 'Owned'}
                                    {currentFilter.state === 'length' &&
                                        'Length'}
                                    {currentFilter.state === 'dateAdded' &&
                                        'Date Added'}
                                </span>
                            </div>
                        )}
                        <Link to={'/filter'} className="button-div">
                            <span>Filter</span>
                            {}
                        </Link>
                    </div>
                </div>
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
