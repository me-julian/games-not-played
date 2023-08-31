import '../public/component-css/nav.css'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { getJwt, parseJwt } from '../auth'
import SignInIcon from './icons/SignInIcon'
import SignOutIcon from './icons/SignOutIcon'

function Nav() {
    const jwt = getJwt()
    const navigate = useNavigate()
    const location = useLocation()

    async function handleSignout() {
        localStorage.removeItem('jwt')
        navigate(location.pathname, { replace: true })
    }

    return (
        <>
            <nav>
                <div className="container-lg">
                    <Link className="brand title" to={'/about'}>
                        Games Not Played
                    </Link>
                    {jwt ? (
                        <>
                            <span className="text-wrap">
                                {parseJwt(jwt).username}
                            </span>
                            <span
                                className="link-icon"
                                tabIndex={0}
                                role="link"
                                onClick={() => {
                                    handleSignout()
                                }}
                            >
                                <span className="sr-only sr-only-focusable">
                                    Sign Out Icon
                                </span>
                                <SignOutIcon />
                            </span>
                        </>
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
        </>
    )
}

export default Nav
