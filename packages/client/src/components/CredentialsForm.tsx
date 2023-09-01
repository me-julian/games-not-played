import { useState } from 'react'
import { Form } from 'react-router-dom'

type Props = {
    type: 'signin' | 'signup'
}

function CredentialsForm({ type }: Props) {
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
                        minLength={type == 'signin' ? 1 : 6}
                    />
                </section>
                <button type="submit">
                    {type === 'signin' ? 'Sign In' : 'Sign Up'}
                </button>
            </div>
        </Form>
    )
}

export default CredentialsForm
