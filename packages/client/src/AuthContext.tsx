import { createContext, useContext, useMemo, useState } from 'react'
import { ActionFunctionArgs, redirect } from 'react-router-dom'
import { Client } from '@react-with-iam/types'

export type jwt = string

export type auth =
    | {
          jwt: jwt
          user: Client.User
      }
    | undefined

export type AuthContext = {
    auth: auth
    setAuthed: (newJWT: jwt, newUser: Client.User) => void
    setUnauthed: () => void
}

const AuthContext = createContext<AuthContext>({
    auth: undefined,
    setAuthed: () => {},
    setUnauthed: () => {},
})

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [auth, setAuth] = useState<auth>(undefined)

    const setAuthed = (newJWT: jwt, newUser: Client.User) => {
        setAuth({
            jwt: newJWT,
            user: newUser,
        })
    }
    const setUnauthed = () => {
        setAuth(undefined)
    }

    // useEffect(() => {
    //     if (token) {
    //         axios.defaults.headers.common['Authorization'] = 'Bearer ' + token
    //         localStorage.setItem('token', token)
    //     } else {
    //         delete axios.defaults.headers.common['Authorization']
    //         localStorage.removeItem('token')
    //     }
    // }, [token])

    const contextValue = useMemo(
        () => ({
            auth,
            setAuthed,
            setUnauthed,
        }),
        [auth]
    )

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    )
}

export const loginAction = ({ setAuthed }: AuthContext) =>
    async function ({
        request,
    }: ActionFunctionArgs): Promise<Response | string | undefined> {
        const formData = await request.formData()

        const response = await fetch(
            `${import.meta.env.VITE_API_URL}/login/password`,
            {
                method: 'POST',
                headers: {
                    content: 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams(formData as any),
            }
        )

        if (response.ok) {
            const returnData = await response.json()
            setAuthed(returnData.jwt, returnData.user)
            return redirect('/')
        } else if (response.status === 401 || response.status === 403) {
            return 'Incorrect username or password.'
        }
    }

export const signupAction = ({ setAuthed }: AuthContext) =>
    async function ({
        request,
    }: ActionFunctionArgs): Promise<Response | string | undefined> {
        const formData = await request.formData()

        const response = await fetch(`${import.meta.env.VITE_API_URL}/signup`, {
            method: 'POST',
            headers: {
                content: 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams(formData as any),
        })

        if (response.ok) {
            const returnData = await response.json()
            setAuthed(returnData.jwt, returnData.user)
            return redirect('/')
        } else if (response.status === 403) {
            return 'Username already in use.'
        }
    }

export const useAuth = () => {
    return useContext(AuthContext)
}

export default AuthProvider
