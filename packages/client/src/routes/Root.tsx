// React
import { Outlet } from 'react-router-dom'
// Utilities
import Cookie from 'js-cookie'
// Components
import Nav from '../components/Nav'
import Footer from '../components/Footer'

export type CSRFToken = {
    token: string
}

export type User = {
    username: string
}

export type RootLoaderData = {
    csrf: CSRFToken
    user?: User
    Cookie: Cookies.CookiesStatic<string>
}

export async function rootLoader() {
    const csrfResponse = await fetch('/csrf-token', {
        method: 'GET',
    })

    const csrf = (await csrfResponse.json()) as CSRFToken

    const userRequest = await fetch('api/users/user', {
        method: 'GET',
        headers: {
            'x-csrf-token': typeof csrf.token === 'string' ? csrf.token : '',
        },
    })

    const user = (await userRequest.json()) as User

    return {
        csrf,
        user: user.username ? user : null,
        Cookie,
    } as RootLoaderData
}

function Root() {
    return (
        <>
            <Nav />
            <Outlet />
            <Footer />
        </>
    )
}

export default Root
