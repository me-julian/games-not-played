import { Client } from '@games-not-played/types'
import AddGame from './AddGame'
import Entry from './Entry'

type Props = {
    entries: Client.Entry[] | null
}

function GameList({ entries }: Props) {
    return (
        <>
            {entries &&
                entries.map((entry) => <Entry key={entry.id} entry={entry} />)}
            <AddGame />
        </>
    )
}

export default GameList
