import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGamepad } from '@fortawesome/free-solid-svg-icons'

function GameList() {
    return (
        <>
            <div>
                <FontAwesomeIcon icon={faGamepad} size="xl" />
                <p>Data provided by RAWG</p>
            </div>
        </>
    )
}

export default GameList
