import '../public/nav.css'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'

type props = {
    actionName: string
}

function ActionNav({ actionName }: props) {
    return (
        <nav>
            <p>{actionName}</p>
            <Link to={'..'}>
                <FontAwesomeIcon icon={faArrowLeft} />
            </Link>
        </nav>
    )
}

export default ActionNav
