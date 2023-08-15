import {
    ActionFunctionArgs,
    Form,
    Navigate,
    redirect,
    useParams,
    useRouteLoaderData,
} from 'react-router-dom'
import ActionNav from '../components/ActionNav'
import { type RootLoaderData } from './Root'
import { getJwt } from '../auth'

function entryUrlRequest(method: string, urlEnding: string) {
    const jwt = getJwt()

    return fetch(`${import.meta.env.VITE_API_URL}${urlEnding}`, {
        method: method,
        headers: {
            Authorization: 'bearer ' + jwt,
        },
    })
}

export async function deleteEntry({
    params,
}: ActionFunctionArgs): Promise<Response> {
    let id = params.entryId

    const response = await entryUrlRequest('DELETE', `/users/list/${id}`)

    if (response.status === 204) {
        return redirect('/')
    } else {
        // Throws this including on 404 - already deleted in another tab?
        throw new Response('Unexpected error deleting entry.')
    }
}

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
                <Form method="DELETE">
                    <button name="delete" type="submit">
                        Delete
                    </button>
                </Form>
            </main>
        </>
    ) : (
        <Navigate to={'/'} />
    )
}

export default Details
