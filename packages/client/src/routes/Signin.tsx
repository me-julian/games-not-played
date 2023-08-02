import { useState } from 'react'
import {
    Form,
    Link,
    Navigate,
    useActionData,
    ActionFunctionArgs,
    redirect,
} from 'react-router-dom'
import ActionNav from '../components/ActionNav'
import { getJwt, requestAuth } from '../auth'

export async function signinAction({ request }: ActionFunctionArgs) {
    const response = await requestAuth(
        await request.formData(),
        '/login/password'
    )

    if (response.ok) {
        const resData = await response.json()
        localStorage.setItem('jwt', resData.jwt)
        return redirect('/')
    } else if (response.status === 400) {
        return new Response('Incorrect username or password.', response)
    } else {
        return new Response('There was an issue signing in.', response)
    }
}

function Signin() {
    const jwt = getJwt()
    const authResponse = useActionData()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const signinScreen = (
        <>
            <ActionNav actionName={'Sign In'} />
            <main>
                <section>
                    <h3>Games Not Played</h3>
                    {typeof authResponse === 'string' && (
                        <section>
                            <p>{authResponse}</p>
                        </section>
                    )}
                    <Form method="post">
                        <div>
                            <section>
                                <label htmlFor="username">Username</label>
                                <input
                                    value={username}
                                    onChange={(e) =>
                                        setUsername(e.target.value)
                                    }
                                    id="username"
                                    name="username"
                                    type="text"
                                    autoComplete="username"
                                    required
                                    autoFocus
                                />
                            </section>
                            <section>
                                <label htmlFor="current-password">
                                    Password
                                </label>
                                <input
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                    id="current-password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                />
                            </section>
                            <button type="submit">Sign in</button>
                        </div>
                    </Form>
                    <hr />
                    <p>
                        Don't have an account?{' '}
                        <Link to={'/signup'} replace={true}>
                            Sign up
                        </Link>
                    </p>
                </section>
            </main>
        </>
    )

    return jwt ? <Navigate to="/" replace={true} /> : signinScreen
}

export default Signin
