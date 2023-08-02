import { useRouteLoaderData } from 'react-router-dom'
import { type RootLoaderData } from '../routes/Root'
import { getJwt, parseJwt } from '../auth'

function UserPreview() {
    const jwt = getJwt()
    const rootData = useRouteLoaderData('root') as RootLoaderData

    return (
        <div>
            <h2>Private Information</h2>
            {jwt && rootData ? (
                <ul>
                    <li>Your username: {parseJwt(jwt).username}</li>
                    <li>Your data: {rootData}</li>
                </ul>
            ) : (
                <h4>Log in to view this info!</h4>
            )}
        </div>
    )
}

export default UserPreview
