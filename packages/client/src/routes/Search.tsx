import React, { useState } from 'react'
import {
    Form,
    useActionData,
    ActionFunctionArgs,
    redirect,
    LoaderFunctionArgs,
    useLoaderData,
    useSubmit,
} from 'react-router-dom'
import ActionNav from '../components/ActionNav'
import { getJwt } from '../auth'
import SearchResult from '../components/SearchResult'

type SearchLoaderData =
    | {
          id: number
          name: string
          playtime?: number
          background_image?: string
      }[]
    | Response
    | null

function requestSearch(urlEnding: string) {
    const jwt = getJwt()

    return fetch(`${import.meta.env.VITE_API_URL}${urlEnding}`, {
        method: 'GET',
        headers: {
            Authorization: 'bearer ' + jwt,
        },
    })
}

export async function loadSearch({
    request,
}: LoaderFunctionArgs): Promise<SearchLoaderData> {
    let url = new URL(request.url)
    let searchTerm = url.searchParams.get('search')

    if (searchTerm) {
        const response = await requestSearch(`/search?search=${searchTerm}`)

        if (response.ok) {
            return response
        } else {
            return new Response('No games found.', { status: 404 })
        }
    } else {
        return null
    }
}

export async function search({ params }: ActionFunctionArgs) {
    const search = params.search

    return redirect('?search=' + search)
}

export async function addToList({ request }: ActionFunctionArgs) {
    const jwt = getJwt()
    const urlEnding = '/users/list/add'
    const response = await fetch(
        `${import.meta.env.VITE_API_URL}${urlEnding}`,
        {
            method: 'POST',
            headers: {
                'content-type': 'application/x-www-form-urlencoded',
                Authorization: 'bearer ' + jwt,
            },
            body: new URLSearchParams((await request.formData()) as any),
        }
    )

    if (response.ok) {
        return redirect('/')
    } else if (response.status === 409) {
        return new Response('This game is already in your list.')
    } else {
        return new Response('There was an issue adding the game to your list.')
    }
}

function Search() {
    const submit = useSubmit()
    const searchData = useLoaderData() as SearchLoaderData
    const authResponse = useActionData()
    const [searchQuery, setSearchQuery] = useState('')

    function onSelect(event: any) {
        submit(event.currentTarget)
    }

    return (
        <>
            <ActionNav actionName={'Search'} />
            <main>
                <section>
                    <Form method="GET">
                        <div>
                            <label htmlFor="search">Search</label>
                            <input
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                id="search"
                                name="search"
                                type="text"
                                autoComplete="off"
                                required
                                autoFocus
                            />
                            <button type="submit">Search</button>
                        </div>
                    </Form>
                    <hr />
                </section>
                {typeof authResponse === 'string' && (
                    <section>
                        <p>{authResponse}</p>
                    </section>
                )}
                {Array.isArray(searchData) ? (
                    searchData.map((result) => (
                        <SearchResult
                            key={result.id}
                            id={result.id}
                            name={result.name}
                            playtime={result.playtime}
                            backgroundImage={result.background_image}
                            handleSelect={onSelect}
                        />
                    ))
                ) : (
                    <p>No games found</p>
                )}
            </main>
        </>
    )
}

export default Search
