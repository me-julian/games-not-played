import '../public/component-css/nav.css'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'

type Props = {
    actionName: string
    containerSize?: 'sm' | 'md' | 'lg'
}

function ActionNav({ actionName, containerSize = 'lg' }: Props) {
    let containerClass
    switch (containerSize) {
        case 'sm':
            containerClass = 'container-sm'
            break
        case 'md':
            containerClass = 'container-md'
            break
        case 'lg':
            containerClass = 'container-lg'
            break
    }

    return (
        <nav>
            <div className={containerClass}>
                <h1 className="title">{actionName}</h1>
                <Link className="link-icon" to={'..'}>
                    <FontAwesomeIcon icon={faArrowLeft} />
                </Link>
            </div>
        </nav>
    )
}

export default ActionNav
