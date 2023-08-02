import { Link, useRouteLoaderData } from 'react-router-dom'
import Nav from '../components/Nav'
import GameList from '../components/GameList'
import { getJwt } from '../auth'
import { RootLoaderData } from './Root'

function Home() {
    const jwt = getJwt()
    const rootData = useRouteLoaderData('root') as RootLoaderData

    return (
        <>
            <Nav />
            <main>
                {jwt && rootData ? (
                    <GameList />
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
