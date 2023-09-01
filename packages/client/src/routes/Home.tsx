import { type RootLoaderData } from './Root'
import { type Client } from '@games-not-played/types'
import { useState } from 'react'
import {
    ActionFunctionArgs,
    Link,
    redirect,
    useFetcher,
    useRouteLoaderData,
} from 'react-router-dom'
import { DragDropContext, DropResult } from '@hello-pangea/dnd'
import Nav from '../components/Nav'
import GameList from '../components/GameList'
import { getJwt } from '../auth'

export async function reorderList({ request }: ActionFunctionArgs) {
    const jwt = getJwt()
    const response = await fetch(`${import.meta.env.VITE_API_URL}/users/list`, {
        method: 'PATCH',
        headers: {
            'content-type': 'application/x-www-form-urlencoded',
            Authorization: 'bearer ' + jwt,
        },
        body: new URLSearchParams((await request.formData()) as any),
    })

    if (response.ok) {
        return redirect('.')
    } else {
        return 'Failed to reorder entries.'
    }
}

function Home() {
    const jwt = getJwt()
    const rootLoaderData = useRouteLoaderData('root') as RootLoaderData

    const fetcher = useFetcher()
    const [optimisticEntries, setOptimisticEntries] = useState(rootLoaderData)

    const reorder = (
        list: Client.Entry[],
        startIndex: number,
        endIndex: number
    ) => {
        const result = Array.from(list)
        const [removed] = result.splice(startIndex, 1)
        result.splice(endIndex, 0, removed)

        return result
    }

    const onDragEnd = (result: DropResult) => {
        if (!result.destination) {
            return
        }

        if (result.destination.index === result.source.index) {
            return
        }

        const updatedEntries = reorder(
            optimisticEntries!,
            result.source.index,
            result.destination.index
        )

        fetcher.submit(
            {
                startIndex: result.source.index.toString(),
                endIndex: result.destination.index.toString(),
            },
            {
                method: 'PATCH',
                action: '/',
            }
        )

        setOptimisticEntries(updatedEntries)
    }

    return (
        <>
            <DragDropContext onDragEnd={onDragEnd}>
                <Nav />
                <main id="game-list">
                    {jwt && rootLoaderData ? (
                        <GameList entries={optimisticEntries} />
                    ) : (
                        <div className="welcome">
                            <h1>Welcome!</h1>
                            <p>
                                <Link className="accent" to="/signin">
                                    Sign in
                                </Link>{' '}
                                to get started.
                            </p>
                        </div>
                    )}
                </main>
            </DragDropContext>
        </>
    )
}

export default Home
