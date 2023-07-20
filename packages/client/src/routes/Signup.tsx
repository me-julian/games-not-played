import { useState } from 'react'
import { Form, Link, Navigate, useActionData } from 'react-router-dom'
import { AuthResponse } from '../types/auth'
import { useAuth } from '../AuthContext'

function Signup() {
    const { jwt } = useAuth()
    const authResponse = useActionData() as AuthResponse
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const signupScreen = (
        <main className="container">
            <section className="text-center">
                <h3>Sample App</h3>
                <h1>Sign up</h1>
                {typeof authResponse === 'string' && (
                    <section className="text-danger">
                        <p>{authResponse}</p>
                    </section>
                )}
                <Form
                    method="post"
                    action="/signup"
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
                                id="current-password"
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
                </Form>
                <hr />
                <p className="fst-italic">
                    Already have an account?{' '}
                    <Link to={'/login'} replace={true}>
                        Sign in
                    </Link>
                </p>
            </section>
        </main>
    )

    return jwt ? <Navigate to="/" replace={true} /> : signupScreen
}

export default Signup
