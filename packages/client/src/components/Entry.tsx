import '../public//component-css/entry.css'
import { Link } from 'react-router-dom'
import { Draggable } from '@hello-pangea/dnd'
import { type Client } from '@games-not-played/types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faStar } from '@fortawesome/free-solid-svg-icons'

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
            {(provided, snapshot) => (
                <div className="entry">
                    <div ref={provided.innerRef} {...provided.draggableProps}>
                        <div className="wrapper">
                            <div
                                className={`card ${
                                    snapshot.isDragging ? 'dragging' : ''
                                }`}
                            >
                                <div
                                    className="card-grip"
                                    {...provided.dragHandleProps}
                                >
                                    <FontAwesomeIcon icon={faBars} />
                                </div>
                                <Link
                                    className="card-link"
                                    to={`/details/${entry.id}`}
                                >
                                    <div className="card-box">
                                        <div className="name-and-star">
                                            <h2 className="name text-wrap">
                                                {entry.game.name}
                                            </h2>
                                            {entry.isStarred && (
                                                <FontAwesomeIcon
                                                    icon={faStar}
                                                />
                                            )}
                                        </div>
                                        <div className="entry-info">
                                            <div className="playtime-and-pills">
                                                {entry.game.playtime && (
                                                    <span className="playtime">
                                                        {entry.game.playtime}{' '}
                                                        Hours
                                                    </span>
                                                )}
                                                {entry.isOwned &&
                                                    !entry.isPlaying && (
                                                        <div className="pill owned">
                                                            Owned
                                                        </div>
                                                    )}
                                            </div>
                                            <div className="date-added">
                                                Added on{' '}
                                                {new Date(
                                                    entry.createdAt
                                                ).toLocaleString(undefined, {
                                                    dateStyle: 'short',
                                                })}
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </Draggable>
    )
}

export default Entry
