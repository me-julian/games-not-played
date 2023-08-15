import { Outlet, redirect } from 'react-router-dom'
import { getJwt } from '../auth'
import { Client } from '@games-not-played/types'

export type RootLoaderData = Client.Entry[] | null

export async function rootLoader() {
    const jwt = getJwt()

    if (jwt) {
        const urlEnding = '/users/list'
        const response = await fetch(
            `${import.meta.env.VITE_API_URL}${urlEnding}`,
            {
                method: 'GET',
                headers: {
                    Authorization: 'Bearer ' + jwt,
                },
            }
        )

        if (response.ok) {
            return response
        } else if (response.status === 401) {
            localStorage.removeItem('jwt')
            // TODO: Send message, do this with all requests
            return redirect('.')
        } else {
            // If the server never responds the page will hang indefinitely.
            throw new Response('Issue getting data from the server.', response)
        }
    } else {
        return null
    }
}

function Root() {
    return (
        <>
            <Outlet />
        </>
    )
}

export default Root
