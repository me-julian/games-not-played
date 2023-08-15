import { Link, useRouteLoaderData } from 'react-router-dom'
import Nav from '../components/Nav'
import GameList from '../components/GameList'
import { getJwt } from '../auth'
import { type RootLoaderData } from './Root'

function Home() {
    const jwt = getJwt()
    const rootLoaderData = useRouteLoaderData('root') as RootLoaderData

    return (
        <>
            <Nav />
            <main>
                {jwt && rootLoaderData ? (
                    <GameList entries={rootLoaderData} />
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
