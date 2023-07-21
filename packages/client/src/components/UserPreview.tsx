import { Button } from 'react-bootstrap'
import { useAuth, type AuthContext } from '../AuthContext'
import {
    Form,
    redirect,
    useRouteLoaderData,
    type ActionFunctionArgs,
} from 'react-router-dom'
import { type RootLoaderData } from '../routes/Root'

export const increaseTickerAction = ({ jwt }: AuthContext) =>
    async function ({ params }: ActionFunctionArgs) {
        const response = await fetch(
            `${import.meta.env.VITE_API_URL}/api/users/${params.userId}/ticker`,
            {
                method: 'PATCH',
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
            }
        )

        if (response.ok) {
            return redirect('/')
        } else {
            throw new Response('Issue increasing ticker value', response)
        }
    }

function UserPreview() {
    const { jwt, parseJwt } = useAuth()
    const rootData = useRouteLoaderData('root') as RootLoaderData

    return (
        <div className="col col-3">
            <h2>Private Information</h2>
            {jwt && rootData ? (
                <ul className="list-group my-2">
                    <li className="list-group-item">
                        Your username: {parseJwt(jwt).username}
                    </li>
                    <li className="list-group-item">
                        Ticker: {rootData.tickerValue}
                    </li>
                    <Form
                        method="patch"
                        action={`/users/${parseJwt(jwt).id}/ticker`}
                    >
                        <Button
                            variant="primary"
                            type="submit"
                            className="mt-2"
                        >
                            Increase Ticker
                        </Button>
                    </Form>
                </ul>
            ) : (
                <h4>Log in to view this info!</h4>
            )}
        </div>
    )
}

export default UserPreview
