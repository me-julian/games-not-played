import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

interface Props {
    csrfToken: string
}

function Nav({ csrfToken }: Props) {
    const [username, setUsername] = useState(null)

    useEffect(() => {
        const abortController = new AbortController()

        async function getUser(abortController: AbortController) {
            const request = await fetch('api/users/user', {
                method: 'GET',
                headers: {
                    'x-csrf-token': csrfToken,
                },
                signal: abortController.signal,
            })

            const data = await request.json()

            setUsername(data.username)
        }

        getUser(abortController)

        return () => {
            abortController.abort()
        }
    }, [csrfToken])

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
                    {username && (
                        <p className="navbar-text m-0 me-3">{username}</p>
                    )}
                    {!username && (
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
