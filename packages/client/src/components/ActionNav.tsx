import '../public/component-css/nav.css'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'

type Props = {
    actionName: string
    containerSize?: 'container-lg' | 'container-md'
}

function ActionNav({ actionName, containerSize = 'container-lg' }: Props) {
    return (
        <nav>
            <div className={containerSize}>
                <h1 className="title">{actionName}</h1>
                <Link className="link-icon" to={'..'}>
                    <FontAwesomeIcon icon={faArrowLeft} />
                </Link>
            </div>
        </nav>
    )
}

export default ActionNav
