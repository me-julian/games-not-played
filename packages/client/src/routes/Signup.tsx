import '../public/component-css/auth.css'
import {
    ActionFunctionArgs,
    Link,
    Navigate,
    redirect,
    useActionData,
} from 'react-router-dom'
import ActionNav from '../components/ActionNav'
import CredentialsForm from '../components/CredentialsForm'
import { getJwt, requestAuth } from '../auth'

export async function signupAction({ request }: ActionFunctionArgs) {
    const response = await requestAuth(await request.formData(), '/signup')

    if (response.ok) {
        const resData = await response.json()
        localStorage.setItem('jwt', resData.jwt)
        return redirect('/')
    } else if (response.status === 403) {
        return new Response('Username already in use.', response)
    } else {
        return new Response('There was an issue signing up.', response)
    }
}

function Signup() {
    const jwt = getJwt()
    const authResponse = useActionData()

    const signupScreen = (
        <>
            <ActionNav actionName={'Sign Up'} />
            <main>
                <section className="auth">
                    <h3 className="brand">Games Not Played</h3>
                    {typeof authResponse === 'string' && (
                        <section>
                            <p>{authResponse}</p>
                        </section>
                    )}
                    <CredentialsForm />
                    <div>
                        <p>Already have an account? </p>
                        <Link className="accent" to={'/signin'} replace={true}>
                            Sign in
                        </Link>
                    </div>
                </section>
            </main>
        </>
    )

    return jwt ? <Navigate to="/" replace={true} /> : signupScreen
}

export default Signup
