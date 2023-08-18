import { Link } from 'react-router-dom'
import { Droppable } from '@hello-pangea/dnd'
import { type Client } from '@games-not-played/types'
import Entry from './Entry'
import AddGame from './AddGame'

type Props = {
    entries: Client.Entry[] | null
}

function GameList({ entries }: Props) {
    const categorizedEntries = entries?.reduce<{
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

    // Apply the offset to the 'other' entries' index so that the separated
    // sets of entries have one contiguous set of indexes on the backend.
    const playingIndexOffset = categorizedEntries?.playing.length || 0

    return (
        <>
            {categorizedEntries && (
                <>
                    {categorizedEntries.playing.length > 0 && (
                        <>
                            <Droppable
                                droppableId="playing-list"
                                type="PLAYING"
                            >
                                {(provided) => (
                                    <div
                                        ref={provided.innerRef}
                                        {...provided.droppableProps}
                                    >
                                        {categorizedEntries.playing.map(
                                            (entry, index) => (
                                                <Entry
                                                    key={entry.id}
                                                    index={index}
                                                    entry={entry}
                                                />
                                            )
                                        )}
                                        {provided.placeholder}
                                    </div>
                                )}
                            </Droppable>
                            {categorizedEntries.playing.length > 0 && <hr />}
                        </>
                    )}

                    {categorizedEntries.other.length > 0 && (
                        <Droppable droppableId="other-list" type="OTHER">
                            {(provided) => (
                                <div
                                    ref={provided.innerRef}
                                    {...provided.droppableProps}
                                >
                                    {categorizedEntries.other.map(
                                        (entry, index) => (
                                            <Entry
                                                key={entry.id}
                                                index={
                                                    index + playingIndexOffset
                                                }
                                                entry={entry}
                                            />
                                        )
                                    )}
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    )}
                </>
            )}
            <AddGame />
            <Link to={'/random'}>
                <button>Random</button>
            </Link>
        </>
    )
}

export default GameList
