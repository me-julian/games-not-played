import { useRef, useState } from 'react'
import { Link, Navigate, useRouteLoaderData } from 'react-router-dom'
import { CSSTransition } from 'react-transition-group'
import ActionNav from '../components/ActionNav'
import { type RootLoaderData } from './Root'
import { type Entry } from '@games-not-played/types/Entry'

function Random() {
    const rootLoaderData = useRouteLoaderData('root') as RootLoaderData
    if (!rootLoaderData) return <Navigate to={'/login'} />
    else {
        const [selectFromOwned, setSelectFromOwned] = useState(false)
        const [selectFromStarred, setSelectFromStarred] = useState(false)
        const [includePlaying, setIncludePlaying] = useState(false)

        const selectAnyRef = useRef(null)
        const selectSpecificRef = useRef(null)

        let entriesFiltered
        if (selectFromOwned || selectFromStarred) {
            entriesFiltered = rootLoaderData.reduce<Entry[]>(
                (entries, currentEntry) => {
                    if (
                        (currentEntry.isOwned && selectFromOwned) ||
                        (currentEntry.isStarred && selectFromStarred)
                    )
                        entries.push(currentEntry)
                    return entries
                },
                []
            )
        } else {
            entriesFiltered = rootLoaderData
        }

        let entriesFilteredAndPlaying
        if (!includePlaying) {
            entriesFilteredAndPlaying = entriesFiltered.reduce<Entry[]>(
                (entries, currentEntry) => {
                    if (!currentEntry.isPlaying) entries.push(currentEntry)
                    return entries
                },
                []
            )
        } else {
            entriesFilteredAndPlaying = entriesFiltered
        }

        const selectedEntry =
            entriesFilteredAndPlaying[
                Math.floor(Math.random() * entriesFilteredAndPlaying.length)
            ]

        return (
            <>
                <ActionNav actionName="Select Random" />
                <CSSTransition
                    nodeRef={selectAnyRef}
                    in={!selectFromOwned && !selectFromStarred}
                    timeout={{ enter: 200, exit: 200 }}
                    classNames="focus-btns"
                >
                    <span
                        className="toggle-btn focus-btns-enter-done"
                        ref={selectAnyRef}
                    >
                        <input
                            className="sr-only"
                            type="checkbox"
                            name="select-from-any"
                            id="select-from-any"
                            checked={!selectFromOwned && !selectFromStarred}
                            onChange={() => {
                                setSelectFromOwned(false)
                                setSelectFromStarred(false)
                            }}
                        />
                        <label htmlFor="select-from-any">Any</label>
                    </span>
                </CSSTransition>
                <CSSTransition
                    nodeRef={selectSpecificRef}
                    in={selectFromOwned || selectFromStarred}
                    timeout={{ enter: 200, exit: 200 }}
                    classNames="focus-btns"
                >
                    <div ref={selectSpecificRef} className="focus-btns-initial">
                        <span className="toggle-btn">
                            <input
                                className="sr-only"
                                type="checkbox"
                                name="select-from-owned"
                                id="select-from-owned"
                                checked={selectFromOwned}
                                onChange={() =>
                                    setSelectFromOwned(!selectFromOwned)
                                }
                            />
                            <label htmlFor="select-from-owned">Owned</label>
                        </span>
                        <span className="toggle-btn">
                            <input
                                className="sr-only"
                                type="checkbox"
                                name="select-from-starred"
                                id="select-from-starred"
                                checked={selectFromStarred}
                                onChange={() =>
                                    setSelectFromStarred(!selectFromStarred)
                                }
                            />
                            <label htmlFor="select-from-starred">Starred</label>
                        </span>
                    </div>
                </CSSTransition>
                <span className="toggle-btn">
                    <input
                        className="sr-only"
                        type="checkbox"
                        name="include-playing"
                        id="include-playing"
                        checked={includePlaying}
                        onChange={() => setIncludePlaying(!includePlaying)}
                    />
                    <label htmlFor="include-playing">Include Playing</label>
                </span>
                {!selectedEntry && (
                    <span style={{ margin: '2.5%' }}>No matching games</span>
                )}
                <div className="fixed-action">
                    {selectedEntry ? (
                        <Link
                            className="button-wrapper"
                            to={
                                selectedEntry
                                    ? `/details/${selectedEntry.id}`
                                    : ''
                            }
                        >
                            <button className="action-btn">Confirm</button>
                        </Link>
                    ) : (
                        <div className="button-wrapper">
                            <button disabled={true} className="action-btn">
                                Confirm
                            </button>
                        </div>
                    )}
                </div>
            </>
        )
    }
}

export default Random
