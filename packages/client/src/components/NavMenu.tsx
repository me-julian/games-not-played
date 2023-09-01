import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { CSSTransition } from 'react-transition-group'
import SignOutIcon from './icons/SignOutIcon'

type Props = {
    showMenu: boolean
    username: string
    onSignout: () => void
}

function NavMenu({ showMenu, username, onSignout }: Props) {
    const menuRef = useRef(null)

    return (
        <CSSTransition
            nodeRef={menuRef}
            in={showMenu}
            timeout={{ enter: 200, exit: 300 }}
            classNames="nav-menu"
            unmountOnExit
        >
            <div className="menu-wrapper" ref={menuRef}>
                <div className="menu-box">
                    <div className="username text-clamp">{username}</div>
                    <Link to={'/about'}>About the app</Link>
                    <div
                        className="link"
                        tabIndex={0}
                        role="link"
                        onClick={() => {
                            onSignout()
                        }}
                    >
                        Sign Out <SignOutIcon />
                    </div>
                </div>
            </div>
        </CSSTransition>
    )
}

export default NavMenu
