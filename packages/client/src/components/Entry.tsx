import { type Client } from '@games-not-played/types'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Draggable } from '@hello-pangea/dnd'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faStar } from '@fortawesome/free-solid-svg-icons'
import '../public/css/entry.css'

type Props = {
    entry: Client.Entry
    index: number
    dndDisabled: boolean | undefined
}

function Entry({ index, entry, dndDisabled }: Props) {
    // Make the whole card the drag handle instead of using the grippy
    // on mobile due to mobile browser swipe gestures causing problems
    // at edge of screen.
    const mobileWidthBoundary = 768
    const [isMobile, setIsMobile] = useState<boolean>(
        window.innerWidth <= mobileWidthBoundary
    )

    function handleWindowSizeChange() {
        if (window.innerWidth <= mobileWidthBoundary) {
            setIsMobile(true)
        } else if (window.innerWidth > mobileWidthBoundary) {
            setIsMobile(false)
        }
    }
    useEffect(() => {
        window.addEventListener('resize', handleWindowSizeChange)
        return () => {
            window.removeEventListener('resize', handleWindowSizeChange)
        }
    }, [])

    return (
        <Draggable
            key={entry.id}
            draggableId={entry.id.toString()}
            index={index}
            isDragDisabled={dndDisabled}
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
                                {!dndDisabled && !isMobile && (
                                    <>
                                        <div
                                            className="card-grip"
                                            {...provided.dragHandleProps}
                                        >
                                            <FontAwesomeIcon icon={faBars} />
                                        </div>
                                    </>
                                )}
                                <Link
                                    className="card-link"
                                    to={`/details/${entry.id}`}
                                    {...(isMobile && provided.dragHandleProps)}
                                >
                                    <div className="card-box">
                                        <div className="name-and-star">
                                            <h2 className="name text-clamp">
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
