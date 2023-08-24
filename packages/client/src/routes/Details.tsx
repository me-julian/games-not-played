import {
    ActionFunctionArgs,
    Form,
    Navigate,
    redirect,
    useFetcher,
    useParams,
    useRouteLoaderData,
} from 'react-router-dom'
import ActionNav from '../components/ActionNav'
import { getJwt } from '../auth'
import { type RootLoaderData } from './Root'
import RawgAttribution from '../components/RawgAttribution'
import EntryFlagToggle from '../components/EntryFlagToggle'

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
    const response = await entryUrlRequest(
        'DELETE',
        `/users/list/${params.entryId}`
    )

    if (response.status === 204) {
        return redirect('/')
    } else {
        // Throws this including on 404 - already deleted in another tab?
        throw new Response('Unexpected error deleting entry.')
    }
}

export async function editEntry({
    request,
    params,
}: ActionFunctionArgs): Promise<Response> {
    // entryUrlRequest('PATCH', `/users/list/${params.entryId}`)
    const jwt = getJwt()
    const response = await fetch(
        `${import.meta.env.VITE_API_URL}/users/list/${params.entryId}`,
        {
            method: 'PATCH',
            headers: {
                'content-type': 'application/x-www-form-urlencoded',
                Authorization: 'bearer ' + jwt,
            },
            body: new URLSearchParams((await request.formData()) as any),
        }
    )

    if (response.status === 204) {
        return response
    } else {
        throw new Response('Something went wrong updating the entry.')
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
                <EntryFlagToggle
                    flagValue={entry.isPlaying}
                    flagType="playing"
                />
                <EntryFlagToggle flagValue={entry.isOwned} flagType="owned" />
                <EntryFlagToggle
                    flagValue={entry.isStarred}
                    flagType="starred"
                />
                <Form method="DELETE">
                    <button className="delete-btn" name="delete" type="submit">
                        Delete
                    </button>
                </Form>
            </main>
            <RawgAttribution />
        </>
    ) : (
        <Navigate to={'/'} />
    )
}

export default Details
