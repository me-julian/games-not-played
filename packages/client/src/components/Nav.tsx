import '../public/component-css/nav.css'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import NavMenu from './NavMenu'
import SignInIcon from './icons/SignInIcon'
import NavMenuBtn from './NavMenuBtn'
import { getJwt, parseJwt } from '../auth'

function Nav() {
    const jwt = getJwt()
    const navigate = useNavigate()

    const [showMenu, setShowMenu] = useState<boolean>(false)

    function handleMenuToggle() {
        setShowMenu(!showMenu)
    }

    async function handleSignout() {
        localStorage.removeItem('jwt')
        navigate(location.pathname, { replace: true })
    }

    return (
        <>
            <nav>
                <div className="container-lg">
                    <span className="brand title">Games Not Played</span>
                    {jwt ? (
                        <NavMenuBtn
                            showMenu={showMenu}
                            onMenuToggle={handleMenuToggle}
                        />
                    ) : (
                        <Link className="link-icon" to={'/signin'}>
                            <span className="sr-only sr-only-focusable">
                                Sign In Icon
                            </span>
                            <SignInIcon />
                        </Link>
                    )}
                </div>
            </nav>
            {jwt && (
                <NavMenu
                    showMenu={showMenu}
                    username={parseJwt(jwt).username}
                    onSignout={handleSignout}
                />
            )}
        </>
    )
}

export default Nav
