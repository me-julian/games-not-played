// React
import {
    Link,
    useNavigate,
    useRevalidator,
    useRouteLoaderData,
} from 'react-router-dom'
// Types
import { RootLoaderData } from '../routes/Root'
import { useState } from 'react'

function Signup() {
    const rootLoaderData = useRouteLoaderData('root') as RootLoaderData
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [message, setMessage] = useState<null | string>(null)

    const navigate = useNavigate()
    const revalidator = useRevalidator()

    async function handleSignup(e: React.BaseSyntheticEvent) {
        e.preventDefault()

        const response = await fetch(`${import.meta.env.VITE_API_URL}/signup`, {
            method: 'POST',
            headers: {
                content: 'application/x-www-form-urlencoded',
                'x-csrf-token':
                    typeof rootLoaderData.csrf.token === 'string'
                        ? rootLoaderData.csrf.token
                        : '',
            },
            body: new URLSearchParams({
                username: username,
                password: password,
            }),
        })

        if (response.ok) {
            revalidator.revalidate()
            navigate('/', { replace: true })
        } else if (response.status === 403) {
            setMessage('Username already in use.')
            setUsername('')
            setPassword('')
        } else {
            setMessage('Unexpected error signing up.')
            setUsername('')
            setPassword('')
        }
    }

    return (
        <main className="container">
            <section className="text-center">
                <h3>Sample App</h3>
                <h1>Sign up</h1>
                {message && (
                    <section>
                        <p className="text-danger">{message}</p>
                    </section>
                )}
                <form
                    onSubmit={(e) => handleSignup(e)}
                    className="row row-cols-1 justify-content-center"
                >
                    <div className="col-3">
                        <section className="m-2 d-flex justify-content-between">
                            <label htmlFor="username">Username</label>
                            <input
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                id="username"
                                name="username"
                                type="text"
                                autoComplete="username"
                                required
                                autoFocus
                            />
                        </section>
                        <section className="m-2 d-flex justify-content-between">
                            <label htmlFor="new-password">Password</label>
                            <input
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                id="new-password"
                                name="password"
                                type="password"
                                autoComplete="new-password"
                                required
                            />
                        </section>
                        <button type="submit" className="m-2">
                            Sign up
                        </button>
                    </div>
                </form>
                <hr />
                <p className="fst-italic">
                    Already have an account? <Link to={'/login'}>Sign in</Link>
                </p>
            </section>
        </main>
    )
}

export default Signup
