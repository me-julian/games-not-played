import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { ActionFunctionArgs, redirect } from 'react-router-dom'
import { Client } from '@react-with-iam/types'

export type jwt = string | null
export type parsedJwt = Client.User & {
    iat: Date
}

export type AuthContext = {
    jwt: jwt
    setJwt: (newJwt: jwt) => void
    parseJwt: (jwt: string) => parsedJwt
    // setUnauthed: () => void
}

const AuthContext = createContext<AuthContext>({} as AuthContext)

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [jwt, setJwt] = useState<jwt>(localStorage.getItem('jwt'))

    // const setJWT = (newJWT: jwt) => {
    //     setJWT_(newJWT)
    // }

    // const setUnauthed = () => {
    //     setJWT(null)
    // }

    useEffect(() => {
        if (jwt) {
            localStorage.setItem('jwt', jwt)
        } else {
            localStorage.removeItem('jwt')
        }
    }, [jwt])

    const parseJwt = function (jwt: string): parsedJwt {
        var base64Url = jwt.split('.')[1]
        var base64 = base64Url.replace('-', '+').replace('_', '/')
        return JSON.parse(atob(base64))
    }

    const contextValue = useMemo(
        () => ({
            jwt,
            setJwt,
            parseJwt,
            // setAuthed,
            // setUnauthed,
        }),
        [jwt]
    )

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    )
}

export const loginAction = ({ setJwt }: AuthContext) =>
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
            const resData = await response.json()
            setJwt(resData.jwt)
            return redirect('/')
        } else if (response.status === 400) {
            return 'Incorrect username or password.'
        } else {
            return 'There was an issue logging in.'
        }
    }

export const signupAction = ({ setJwt }: AuthContext) =>
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
            const resData = await response.json()
            setJwt(resData.jwt)
            return redirect('/')
        } else if (response.status === 403) {
            return 'Username already in use.'
        } else {
            return 'There was an issue with your sign up.'
        }
    }

export const useAuth = () => {
    return useContext(AuthContext)
}

export default AuthProvider
