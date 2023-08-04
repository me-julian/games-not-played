import { Client } from '@games-not-played/types'

type Props = { entry: Client.BacklogEntry }

function ListEntry({ entry }: Props) {
    return (
        <div>
            <h6>{entry.game.name}</h6>
            {entry.game.playtime && <span>{entry.game.playtime}</span>}
            <hr />
        </div>
    )
}

export default ListEntry
