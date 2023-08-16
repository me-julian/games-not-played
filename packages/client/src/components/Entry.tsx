import { Link } from 'react-router-dom'
import { Client } from '@games-not-played/types'

type Props = { entry: Client.Entry }

function Entry({ entry }: Props) {
    return (
        <Link to={`/details/${entry.id}`}>
            <div>
                <h6>{entry.game.name}</h6>
                {entry.game.playtime && (
                    <span>{entry.game.playtime} Hours</span>
                )}
                {entry.isOwned && <div>Owned!</div>}
                {entry.isStarred && <div>Starred!</div>}
                <hr />
            </div>
        </Link>
    )
}

export default Entry
