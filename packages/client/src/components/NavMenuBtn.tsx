import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'

type Props = {
    showMenu: boolean
    onMenuToggle: () => void
}

function NavMenuBtn({ showMenu, onMenuToggle }: Props) {
    return (
        <div
            tabIndex={0}
            role="link"
            onClick={() => {
                onMenuToggle()
            }}
            className={`hamburger-toggle link-icon ${
                showMenu ? 'enabled' : ''
            }`}
            style={{ position: 'relative', zIndex: 150 }}
        >
            <span className="sr-only sr-only-focusable">Menu</span>
            <FontAwesomeIcon icon={faBars} />
        </div>
    )
}

export default NavMenuBtn
