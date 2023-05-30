import Cookie from 'js-cookie'
import { Link, useNavigate, useRouteLoaderData } from 'react-router-dom'
import { RootLoaderData } from '../routes/Root'

function Nav() {
    const rootLoaderData = useRouteLoaderData('root') as RootLoaderData

    const navigate = useNavigate()

    async function handleLogout() {
        await fetch('/logout', {
            method: 'POST',
            headers: {
                'x-csrf-token': rootLoaderData.csrf!.token,
            },
        })

        Cookie.remove('connect.sid')
        navigate(window.location, { replace: true })
    }

    return (
        <>
            <nav className="navbar navbar-expand-lg bg-light">
                <div className="container-fluid">
                    <Link className="navbar-brand me-4" to={'/'}>
                        Home
                    </Link>
                    <Link to={'about'} className="navbar-text me-auto">
                        About
                    </Link>
                    {rootLoaderData.user ? (
                        <>
                            <p className="navbar-text m-0 me-3">
                                {rootLoaderData.user.username}
                            </p>
                            <div
                                onClick={() => {
                                    handleLogout()
                                }}
                                className="navbar-text me-4"
                            >
                                Logout
                            </div>
                        </>
                    ) : (
                        <a className="navbar-text mx-4" href="/login">
                            Login
                        </a>
                    )}
                </div>
            </nav>
        </>
    )
}

export default Nav
