import '../public/nav.css'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignOutAlt, faSignInAlt } from '@fortawesome/free-solid-svg-icons'
import { getJwt, parseJwt } from '../auth'

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
                            <FontAwesomeIcon icon={faSignOutAlt} />
                        </span>
                    </>
                ) : (
                    <Link className="link-icon" to={'/signin'}>
                        <span className="sr-only sr-only-focusable">
                            Sign In Icon
                        </span>
                        <FontAwesomeIcon icon={faSignInAlt} />
                    </Link>
                )}
            </nav>
        </>
    )
}

export default Nav
