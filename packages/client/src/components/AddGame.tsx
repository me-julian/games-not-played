import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGamepad } from '@fortawesome/free-solid-svg-icons'
import RawgAttribution from './RawgAttribution'

function AddGame() {
    return (
        <div>
            <Link to="/search">
                <span className="sr-only sr-only-focusable">Add Game</span>
                <FontAwesomeIcon icon={faGamepad} size="4x" />
            </Link>
            <RawgAttribution />
        </div>
    )
}

export default AddGame
