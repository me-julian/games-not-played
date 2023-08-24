import { useEffect, useState } from 'react'
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

export type RootOutletContext = {
    currentFilter: {
        state: string
        setter: React.Dispatch<React.SetStateAction<string>>
    }
    filterDirection: {
        state: 'asc' | 'desc'
        setter: React.Dispatch<React.SetStateAction<'asc' | 'desc'>>
    }
}

function Root() {
    const [currentFilter, setCurrentFilter] = useState(
        localStorage.getItem('lastFilter') || 'custom'
    )
    const [filterDirection, setFilterDirection] = useState(
        localStorage.getItem('lastFilterDirection') || 'asc'
    )

    useEffect(() => {
        localStorage.setItem('lastFilter', currentFilter)
        localStorage.setItem('lastFilterDirection', filterDirection)
    }, [currentFilter, filterDirection])

    return (
        <>
            <Outlet
                context={{
                    currentFilter: {
                        state: currentFilter,
                        setter: setCurrentFilter,
                    },
                    filterDirection: {
                        state: filterDirection,
                        setter: setFilterDirection,
                    },
                }}
            />
        </>
    )
}

export default Root
