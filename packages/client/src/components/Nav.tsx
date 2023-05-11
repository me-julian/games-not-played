import { Link } from 'react-router-dom'

function Nav() {
    return (
        <>
            <nav className="navbar navbar-expand-lg bg-light">
                <div className="container-fluid">
                    <Link className="navbar-brand me-auto" to={'/'}>
                        Homepage
                    </Link>
                    <Link to={'about'} className="navbar-text">
                        About
                    </Link>
                    <a className="navbar-text mx-4" href="/login">
                        Login
                    </a>
                </div>
            </nav>
        </>
    )
}

export default Nav
