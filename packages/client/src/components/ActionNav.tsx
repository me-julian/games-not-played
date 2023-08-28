import '../public/component-css/nav.css'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'

type Props = {
    actionName: string
}

function ActionNav({ actionName }: Props) {
    return (
        <nav>
            <h1 className="title">{actionName}</h1>
            <Link className="link-icon" to={'..'}>
                <FontAwesomeIcon icon={faArrowLeft} />
            </Link>
        </nav>
    )
}

export default ActionNav
