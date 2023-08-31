import '../public/component-css/nav.css'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'

type Props = {
    actionName: string
}

function ActionNav({ actionName }: Props) {
    let containerSize = ''
    switch (actionName) {
        case 'Select Random':
        case 'Filter':
            containerSize = 'container-md'
            break
        case 'About':
        case 'Game Details':
        case 'Sign In':
        case 'Sign Out':
        case 'Search':
        default:
            containerSize = 'container-lg'
    }

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
