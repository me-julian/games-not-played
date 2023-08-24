import { useEffect, useRef, useState } from 'react'
import {
    Form,
    useActionData,
    ActionFunctionArgs,
    redirect,
    LoaderFunctionArgs,
    useLoaderData,
    useSubmit,
    useSearchParams,
    useNavigation,
} from 'react-router-dom'
import ActionNav from '../components/ActionNav'
import { getJwt } from '../auth'
import SearchResult from '../components/SearchResult'
import { RAWG } from '@games-not-played/types'

type SearchLoaderData = RAWG.SearchResults | Response | null

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
    let page = url.searchParams.get('page')

    if (searchTerm) {
        if (Number(page) === 0 || Number.isNaN(page)) {
            return redirect(`/search?search=${searchTerm}&page=${1}`)
        }

        const response = await requestSearch(
            `/search?search=${searchTerm}&page=${page}`
        )

        if (response.ok) {
            return response
        } else {
            throw new Response('Something went wrong with your search.')
        }
    } else {
        return null
    }
}

export async function addToList({ request }: ActionFunctionArgs) {
    const jwt = getJwt()
    const urlEnding = `/users/list`
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

function isResults(
    data: SearchLoaderData | Response | null
): data is RAWG.SearchResults {
    if (data) {
        return (data as RAWG.SearchResults).results !== undefined
    } else {
        return false
    }
}

function Search() {
    const searchData = useLoaderData() as SearchLoaderData
    const actionResponse = useActionData()

    const submit = useSubmit()
    const [searchParams, setSearchParams] = useSearchParams()
    const [searchQuery, setSearchQuery] = useState(
        searchParams.get('search') || ''
    )
    const page = searchParams.has('page') ? Number(searchParams.get('page')) : 1

    function handleSelect(event: any) {
        submit(event.currentTarget)
    }

    const searchForm = useRef<HTMLFormElement>(null)
    useEffect(() => {
        const search = setTimeout(() => {
            submit(searchForm.current)
        }, 500)

        return () => clearTimeout(search)
    }, [searchQuery])

    const navigation = useNavigation()

    return (
        <>
            <ActionNav actionName={'Search'} />
            <main>
                <section>
                    <Form method="GET" ref={searchForm}>
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
                            <input
                                type="hidden"
                                value={1}
                                id="page"
                                name="page"
                            />
                            <button type="submit">Search</button>
                        </div>
                    </Form>
                    <hr />
                </section>
                {navigation.state !== 'idle' ? (
                    <p>Loading...</p>
                ) : (
                    <>
                        {typeof actionResponse === 'string' && (
                            <section>
                                <p>{actionResponse}</p>
                            </section>
                        )}
                        {searchData &&
                            (isResults(searchData) ? (
                                <>
                                    {searchData.results.map((result) => (
                                        <SearchResult
                                            key={result.id}
                                            id={result.id}
                                            name={result.name}
                                            playtime={result.playtime}
                                            backgroundImage={
                                                result.background_image
                                            }
                                            updated={result.updated}
                                            onSelect={handleSelect}
                                        />
                                    ))}
                                    {(searchData.previous ||
                                        searchData.next) && (
                                        <>
                                            <div>Page: {page}</div>
                                            <button
                                                disabled={!searchData.previous}
                                                onClick={() => {
                                                    searchParams.set(
                                                        'page',
                                                        (page - 1).toString()
                                                    )
                                                    setSearchParams(
                                                        searchParams
                                                    )
                                                }}
                                            >
                                                Previous Page
                                            </button>
                                            <button
                                                disabled={!searchData.next}
                                                onClick={() => {
                                                    searchParams.set(
                                                        'page',
                                                        (page + 1).toString()
                                                    )
                                                    setSearchParams(
                                                        searchParams
                                                    )
                                                }}
                                            >
                                                Next Page
                                            </button>
                                        </>
                                    )}
                                    <sub>{searchData.count} results found.</sub>
                                </>
                            ) : (
                                <p>
                                    There was an issue finding any results for
                                    your search.
                                </p>
                            ))}
                    </>
                )}
            </main>
        </>
    )
}

export default Search
