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
import '../public/css/auth-page.css'

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

    if (jwt) {
        return <Navigate to="/" replace={true} />
    }

    const actionResponse = useActionData()

    return (
        <>
            <ActionNav actionName={'Sign Up'} containerSize="sm" />
            <main className="auth-page">
                <section>
                    <h3 className="brand">Games Not Played</h3>
                    {typeof actionResponse === 'string' && (
                        <section>
                            <p>{actionResponse}</p>
                        </section>
                    )}
                    <CredentialsForm type="signup" />
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
}

export default Signup
