import '../public/component-css/auth.css'
import {
    Link,
    Navigate,
    useActionData,
    ActionFunctionArgs,
    redirect,
} from 'react-router-dom'
import ActionNav from '../components/ActionNav'
import CredentialsForm from '../components/CredentialsForm'
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

    const signinScreen = (
        <>
            <ActionNav actionName={'Sign In'} containerSize="sm" />
            <main className="auth">
                <section>
                    <h3 className="brand">Games Not Played</h3>
                    {typeof authResponse === 'string' && (
                        <section>
                            <p>{authResponse}</p>
                        </section>
                    )}
                    <CredentialsForm />
                    <div>
                        <p>Don't have an account? </p>
                        <Link className="accent" to={'/signup'} replace={true}>
                            Sign up
                        </Link>
                    </div>
                </section>
            </main>
        </>
    )

    return jwt ? <Navigate to="/" replace={true} /> : signinScreen
}

export default Signin
