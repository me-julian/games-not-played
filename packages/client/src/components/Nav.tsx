import { Link } from 'react-router-dom'
import { useAuth } from '../AuthContext'

function Nav() {
    const { jwt, setJwt, parseJwt } = useAuth()

    async function handleLogout() {
        setJwt(null)
    }

    return (
        <>
            <nav className="navbar navbar-expand-lg bg-light">
                <div className="container-fluid">
                    <Link className="navbar-brand me-4" to={'/'}>
                        Home
                    </Link>
                    <Link to={'/about'} className="navbar-text me-auto">
                        About
                    </Link>
                    {jwt ? (
                        <>
                            <p className="navbar-text m-0 me-3">
                                {parseJwt(jwt).username}
                            </p>
                            <div
                                onClick={() => {
                                    handleLogout()
                                }}
                                className="navbar-text link me-4"
                            >
                                Logout
                            </div>
                        </>
                    ) : (
                        <Link to={'/login'} className="navbar-text mx-4">
                            Login
                        </Link>
                    )}
                </div>
            </nav>
        </>
    )
}

export default Nav
