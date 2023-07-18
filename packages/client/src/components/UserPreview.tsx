import { useAuth } from '../AuthContext'

function UserPreview() {
    const { auth } = useAuth()

    return (
        <div className="col col-3">
            <h2>Private Information</h2>
            {auth ? (
                <ul className="list-group my-2">
                    <li className="list-group-item">
                        Your username: {auth.user.username}
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
