import { useAuth } from '../AuthContext'

function UserPreview() {
    const { jwt, parseJwt } = useAuth()

    return (
        <div className="col col-3">
            <h2>Private Information</h2>
            {jwt ? (
                <ul className="list-group my-2">
                    <li className="list-group-item">
                        Your username: {parseJwt(jwt).username}
                    </li>
                    <li className="list-group-item">
                        Ticker: {parseJwt(jwt).tickerValue}
                    </li>
                </ul>
            ) : (
                <h4>Log in to view this info!</h4>
            )}
        </div>
    )
}

export default UserPreview
