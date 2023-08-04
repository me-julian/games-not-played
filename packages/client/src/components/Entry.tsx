import { Client } from '@games-not-played/types'

type Props = { entryData: Client.Entry }

function Entry({ entryData }: Props) {
    return (
        <div>
            <h6>{entryData.game.name}</h6>
            {entryData.game.playtime && <span>{entryData.game.playtime}</span>}
            <hr />
        </div>
    )
}

export default Entry
