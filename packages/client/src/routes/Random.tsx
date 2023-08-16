import { useState } from 'react'
import { Link, Navigate, useRouteLoaderData } from 'react-router-dom'
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
                <span>
                    <label htmlFor="select-from-any">Any</label>
                    <input
                        type="checkbox"
                        name="select-from-any"
                        id="select-from-any"
                        checked={!selectFromOwned && !selectFromStarred}
                        onChange={() => {
                            setSelectFromOwned(false)
                            setSelectFromStarred(false)
                        }}
                    />
                </span>
                <span>
                    <label htmlFor="select-from-owned">Owned</label>
                    <input
                        type="checkbox"
                        name="select-from-owned"
                        id="select-from-owned"
                        checked={selectFromOwned}
                        onChange={() => setSelectFromOwned(!selectFromOwned)}
                    />
                </span>
                <span>
                    <label htmlFor="select-from-starred">Starred</label>
                    <input
                        type="checkbox"
                        name="select-from-starred"
                        id="select-from-starred"
                        checked={selectFromStarred}
                        onChange={() =>
                            setSelectFromStarred(!selectFromStarred)
                        }
                    />
                </span>
                <span>
                    <label htmlFor="include-playing">Playing</label>
                    <input
                        type="checkbox"
                        name="include-playing"
                        id="include-playing"
                        checked={includePlaying}
                        onChange={() => setIncludePlaying(!includePlaying)}
                    />
                </span>
                {selectedEntry ? (
                    <Link to={`/details/${selectedEntry.id}`}>
                        <button>Confirm</button>
                    </Link>
                ) : (
                    <span>No matching games</span>
                )}
            </>
        )
    }
}

export default Random
