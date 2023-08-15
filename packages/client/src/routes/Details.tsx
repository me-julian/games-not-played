import { Form, Navigate, useParams, useRouteLoaderData } from 'react-router-dom'
import ActionNav from '../components/ActionNav'
import { type RootLoaderData } from './Root'

function Details() {
    const rootLoaderData = useRouteLoaderData('root') as RootLoaderData
    const { entryId } = useParams()
    // No user feedback if there's an error (bad/stale ID in url)
    const entry = rootLoaderData?.find(
        (entry) => entry.id === parseInt(entryId!)
    )

    return entry ? (
        <>
            <ActionNav actionName="Details" />
            <main>
                <h4>{entry.game.name}</h4>
                <p>{entry.game.playtime} Hours</p>
                <p>Added {entry.game.updatedAt.toLocaleString()}</p>
                {<p>Playing: {entry.isPlaying ? 'true' : 'false'}</p>}
                {<p>Owned: {entry.isOwned ? 'true' : 'false'}</p>}
                {<p>Star: {entry.isStarred ? 'true' : 'false'}</p>}
                <Form>
                    <button name="delete">Delete</button>
                </Form>
            </main>
        </>
    ) : (
        <Navigate to={'/'} />
    )
}

export default Details
