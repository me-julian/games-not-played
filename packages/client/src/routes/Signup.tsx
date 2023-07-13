import { useState } from 'react'
import {
    ActionFunctionArgs,
    Form,
    Link,
    Navigate,
    redirect,
    useActionData,
    useRouteLoaderData,
} from 'react-router-dom'
import { RootLoaderData } from '../routes/Root'
import { AuthResponse } from '../types/auth'

export async function signupAction({
    request,
}: ActionFunctionArgs): Promise<Response | string | undefined> {
    const formData = await request.formData()
    const csrf = String(formData.get('_csrf'))
    formData.delete('_csrf')

    const response = await fetch(`${import.meta.env.VITE_API_URL}/signup`, {
        method: 'POST',
        headers: {
            content: 'application/x-www-form-urlencoded',
            'x-csrf-token': csrf,
        },
        body: new URLSearchParams(formData as any),
    })

    if (response.ok) {
        return redirect('/')
    } else if (response.status === 403) {
        return 'Username already in use.'
    }
}

function Signup() {
    const rootLoaderData = useRouteLoaderData('root') as RootLoaderData
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
                        <input
                            type="hidden"
                            name="_csrf"
                            value={rootLoaderData.csrf.token}
                        />
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

    return rootLoaderData.user ? (
        <Navigate to="/" replace={true} />
    ) : (
        signupScreen
    )
}

export default Signup
