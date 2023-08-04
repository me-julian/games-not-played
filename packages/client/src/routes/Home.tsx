import { Link, useLoaderData } from 'react-router-dom'
import Nav from '../components/Nav'
import GameList from '../components/GameList'
import { getJwt } from '../auth'
import { Client } from '@games-not-played/types'

export type HomeLoaderData = Client.Entry[] | null

export async function homeLoader() {
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
        } else {
            throw new Response('Issue getting data from the server.', response)
        }
    } else {
        return new Response(null)
    }
}

function Home() {
    const jwt = getJwt()
    const loaderData = useLoaderData() as HomeLoaderData

    return (
        <>
            <Nav />
            <main>
                {jwt && loaderData ? (
                    <GameList entries={loaderData} />
                ) : (
                    <>
                        <h1>Welcome!</h1>
                        <span>
                            <Link to="/signin">Sign in</Link> to get started.
                        </span>
                    </>
                )}
            </main>
        </>
    )
}

export default Home
