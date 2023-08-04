import { Client } from '@games-not-played/types'
import AddGame from './AddGame'
import ListEntry from './ListEntry'

type Props = {
    entries: Client.BacklogEntry[] | null
}

function GameList({ entries }: Props) {
    return (
        <>
            {entries &&
                entries.map((entry) => (
                    <ListEntry key={entry.id} entry={entry} />
                ))}
            <AddGame />
        </>
    )
}

export default GameList
