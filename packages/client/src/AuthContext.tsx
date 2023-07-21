import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { redirect, type ActionFunctionArgs } from 'react-router-dom'
import { type Client } from '@react-with-iam/types'

export type Jwt = string | null
export type ParsedJwt = Client.User & {
    iat: Date
}

export type AuthContext = {
    jwt: Jwt
    setJwt: (newJwt: Jwt) => void
    parseJwt: (jwt: string) => ParsedJwt
}

const AuthContext = createContext<AuthContext>({} as AuthContext)

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [jwt, setJwt] = useState<Jwt>(localStorage.getItem('jwt'))

    useEffect(() => {
        if (jwt) {
            localStorage.setItem('jwt', jwt)
        } else {
            localStorage.removeItem('jwt')
        }
    }, [jwt])

    const parseJwt = function (jwt: string): ParsedJwt {
        var base64Url = jwt.split('.')[1]
        var base64 = base64Url.replace('-', '+').replace('_', '/')
        return JSON.parse(atob(base64))
    }

    const contextValue = useMemo(
        () => ({
            jwt,
            setJwt,
            parseJwt,
        }),
        [jwt]
    )

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const auth = useContext(AuthContext)
    if (!auth) {
        throw new Error('Cannot use `useAuth` outside of an AuthProvider.')
    }
    return auth
}

function requestAuth(formData: FormData, urlEnding: string) {
    return fetch(`${import.meta.env.VITE_API_URL}${urlEnding}`, {
        method: 'POST',
        headers: {
            content: 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams(formData as any),
    })
}

export const loginAction = ({ setJwt }: AuthContext) =>
    async function ({ request }: ActionFunctionArgs) {
        const response = await requestAuth(
            await request.formData(),
            '/login/password'
        )

        if (response.ok) {
            const resData = await response.json()
            setJwt(resData.jwt)
            return redirect('/')
        } else if (response.status === 400) {
            return new Response('Incorrect username or password.', response)
        } else {
            return new Response('There was an issue logging in.', response)
        }
    }

export const signupAction = ({ setJwt }: AuthContext) =>
    async function ({ request }: ActionFunctionArgs) {
        const response = await requestAuth(await request.formData(), '/signup')

        if (response.ok) {
            const resData = await response.json()
            setJwt(resData.jwt)
            return redirect('/')
        } else if (response.status === 403) {
            return new Response('Username already in use.', response)
        } else {
            return new Response('There was an issue signing up.', response)
        }
    }

export default AuthProvider
