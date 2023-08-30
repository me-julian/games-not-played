import '../public/component-css/details.css'
import { type RootLoaderData } from './Root'
import {
    ActionFunctionArgs,
    Form,
    Navigate,
    redirect,
    useParams,
    useRouteLoaderData,
} from 'react-router-dom'
import ActionNav from '../components/ActionNav'
import EntryFlagToggle from '../components/EntryFlagToggle'
import RawgAttribution from '../components/RawgAttribution'
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

function returnDaysSince(date: Date | string) {
    const interval = Date.now() - new Date(date).getTime()
    const dayMs = 1000 * 60 * 60 * 24
    return Math.floor(interval / dayMs)
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
            <main
                id="details"
                style={{
                    backgroundImage:
                        `linear-gradient(to bottom, #00000099, var(--bg-0)), url(${entry.game.backgroundImage})` ||
                        'none',
                }}
            >
                <div className="text-info">
                    <h4 className="name">{entry.game.name}</h4>
                    <p>
                        Average Length:{' '}
                        {entry.game.playtime
                            ? `${entry.game.playtime} Hours`
                            : 'Unknown'}
                    </p>
                    <p>
                        On list for {returnDaysSince(entry.game.updatedAt)} days
                    </p>
                </div>
                <div className="details-btns">
                    <div className="wrapper">
                        <Form method="DELETE" className="delete-form">
                            <button
                                className="delete-btn"
                                name="delete"
                                type="submit"
                            >
                                Delete
                            </button>
                        </Form>
                        <div className="flag-toggles">
                            <EntryFlagToggle
                                flagValue={entry.isPlaying}
                                flagType="playing"
                            />
                            <EntryFlagToggle
                                flagValue={entry.isOwned}
                                flagType="owned"
                            />
                            <EntryFlagToggle
                                flagValue={entry.isStarred}
                                flagType="starred"
                            />
                        </div>
                    </div>
                </div>
            </main>
            <RawgAttribution />
        </>
    ) : (
        <Navigate to={'/'} />
    )
}

export default Details
