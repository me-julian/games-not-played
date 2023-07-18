import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { ActionFunctionArgs, redirect } from 'react-router-dom'

export type jwt = string | undefined

export type user = {
    username: string
    id: string
}

export type AuthContext = {
    jwt: jwt | undefined
    user: user | undefined
    setAuthed: (newJWT: jwt, newUser: user) => void
    setUnauthed: () => void
}

const AuthContext = createContext<AuthContext>({
    jwt: undefined,
    user: undefined,
    setAuthed: () => {},
    setUnauthed: () => {},
})

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [jwt, setJWT] = useState<jwt | undefined>(undefined)
    const [user, setUser] = useState<user | undefined>(undefined)

    const setAuthed = (newJWT: jwt, newUser: user) => {
        setJWT(newJWT)
        setUser(newUser)
    }
    const setUnauthed = () => {
        setJWT(undefined)
        setUser(undefined)
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
            jwt,
            user,
            setAuthed,
            setUnauthed,
        }),
        [jwt, user]
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

export const useAuth = () => {
    return useContext(AuthContext)
}

export default AuthProvider
