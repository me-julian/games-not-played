import { Link } from 'react-router-dom'
import BackIcon from './icons/BackIcon'
import '../public/css/nav.css'

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
                    <BackIcon />
                </Link>
            </div>
        </nav>
    )
}

export default ActionNav
