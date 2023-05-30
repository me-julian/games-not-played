// React
import { useRouteLoaderData } from 'react-router-dom'
// Types
import { RootLoaderData } from '../routes/Root'

function UserPreview() {
    const rootLoaderData = useRouteLoaderData('root') as RootLoaderData

    return (
        <div className="col col-3">
            <h2>Private Information</h2>
            {rootLoaderData.user ? (
                <ul className="list-group my-2">
                    <li className="list-group-item">
                        Your username: {rootLoaderData.user.username}
                    </li>
                    <li className="list-group-item">A second item</li>
                    <li className="list-group-item">A third item</li>
                    <li className="list-group-item">A fourth item</li>
                    <li className="list-group-item">And a fifth one</li>
                </ul>
            ) : (
                <h4>Log in to view this info!</h4>
            )}
        </div>
    )
}

export default UserPreview
