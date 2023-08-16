import { Client } from '@games-not-played/types'
import AddGame from './AddGame'
import Entry from './Entry'
import { Link } from 'react-router-dom'

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

    return (
        <>
            {categorizedEntries && (
                <>
                    {categorizedEntries.playing.length > 0 &&
                        categorizedEntries.playing.map((entry) => (
                            <Entry key={entry.id} entry={entry} />
                        ))}
                    {categorizedEntries.playing.length > 0 && <hr />}

                    {categorizedEntries.other.length > 0 &&
                        categorizedEntries.other.map((entry) => (
                            <Entry key={entry.id} entry={entry} />
                        ))}
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
