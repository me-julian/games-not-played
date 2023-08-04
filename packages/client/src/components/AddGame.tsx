import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGamepad } from '@fortawesome/free-solid-svg-icons'

function AddGame() {
    return (
        <div>
            <Link to="/search">
                <span className="sr-only sr-only-focusable">Add Game</span>
                <FontAwesomeIcon icon={faGamepad} size="4x" />
            </Link>
            <p>Data provided by RAWG</p>
        </div>
    )
}

export default AddGame
