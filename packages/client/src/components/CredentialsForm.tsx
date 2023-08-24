import { useState } from 'react'
import { Form } from 'react-router-dom'

function CredentialsForm() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    return (
        <Form method="post">
            <div>
                <section>
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
                <section>
                    <label htmlFor="current-password">Password</label>
                    <input
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
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
    )
}

export default CredentialsForm
