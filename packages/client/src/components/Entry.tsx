import { Link } from 'react-router-dom'
import { Draggable } from '@hello-pangea/dnd'
import { type Client } from '@games-not-played/types'
import '../public/entry.css'

type Props = {
    entry: Client.Entry
    index: number
}

function Entry({ index, entry }: Props) {
    return (
        <Draggable
            key={entry.id}
            draggableId={entry.id.toString()}
            index={index}
        >
            {(provided) => (
                <Link to={`/details/${entry.id}`}>
                    <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                    >
                        <div className="entry">
                            <h6
                                style={{
                                    margin: 0,
                                    paddingTop: 2 + 'rem',
                                    paddingBottom: 1 + 'rem',
                                }}
                            >
                                {entry.game.name}
                            </h6>
                            {entry.game.playtime && (
                                <span>{entry.game.playtime} Hours</span>
                            )}
                            {entry.isPlaying && <div>Playing!</div>}
                            {entry.isOwned && <div>Owned!</div>}
                            {entry.isStarred && <div>Starred!</div>}
                            <hr
                                style={{
                                    margin: 0,
                                    marginTop: 1 + 'rem',
                                }}
                            />
                        </div>
                    </div>
                </Link>
            )}
        </Draggable>
    )
}

export default Entry
