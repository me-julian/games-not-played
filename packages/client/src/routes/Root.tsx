import { Client } from '@games-not-played/types'
import { useEffect, useState } from 'react'
import { Outlet, redirect } from 'react-router-dom'
import { getJwt } from '../auth'

export type RootLoaderData = Client.Entry[] | null

export async function rootLoader() {
    const jwt = getJwt()

    if (jwt) {
        const urlEnding = '/list'
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
    showPlaying: {
        state: boolean
        setter: React.Dispatch<React.SetStateAction<boolean>>
    }
}

function Root() {
    const [currentFilter, setCurrentFilter] = useState(
        localStorage.getItem('lastFilter') || 'custom'
    )
    const [filterDirection, setFilterDirection] = useState(
        localStorage.getItem('lastFilterDirection') || 'asc'
    )

    const [showPlaying, setShowPlaying] = useState(
        localStorage.getItem('lastShowPlaying')
            ? localStorage.getItem('lastShowPlaying') === 'true'
            : true
    )

    useEffect(() => {
        localStorage.setItem('lastFilter', currentFilter)
        localStorage.setItem('lastFilterDirection', filterDirection)
        localStorage.setItem('lastShowPlaying', showPlaying.toString())
    }, [currentFilter, filterDirection, showPlaying])

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
                    showPlaying: {
                        state: showPlaying,
                        setter: setShowPlaying,
                    },
                }}
            />
        </>
    )
}

export default Root
