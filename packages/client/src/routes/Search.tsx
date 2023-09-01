import '../public/component-css/search.css'
import { RAWG } from '@games-not-played/types'
import { useEffect, useRef, useState } from 'react'
import {
    Form,
    ActionFunctionArgs,
    redirect,
    LoaderFunctionArgs,
    useLoaderData,
    useSubmit,
    useSearchParams,
    useNavigation,
} from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons'
import ActionNav from '../components/ActionNav'
import SearchResults from '../components/SearchResults'
import RawgAttribution from '../components/RawgAttribution'
import { getJwt } from '../auth'

export type SearchLoaderData = RAWG.SearchResults | Response | null

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

function Search() {
    const searchData = useLoaderData() as SearchLoaderData

    const navigation = useNavigation()
    const submit = useSubmit()

    const [searchParams, setSearchParams] = useSearchParams()
    const [searchQuery, setSearchQuery] = useState(
        searchParams.get('search') || ''
    )
    const page = searchParams.has('page') ? Number(searchParams.get('page')) : 1

    const searchForm = useRef<HTMLFormElement>(null)
    useEffect(() => {
        const search = setTimeout(() => {
            if (searchQuery !== '') submit(searchForm.current)
        }, 500)

        return () => clearTimeout(search)
    }, [searchQuery])

    return (
        <>
            <ActionNav actionName={'Search'} containerSize="md" />
            <main id="search">
                <section id="search-form">
                    <Form method="GET" ref={searchForm}>
                        <div>
                            <label htmlFor="search" className="sr-only">
                                Search
                            </label>
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
                        </div>
                    </Form>
                </section>
                {navigation.state === 'loading' &&
                navigation.formMethod !== 'post' ? (
                    <div className="spinner">
                        <FontAwesomeIcon icon={faCircleNotch} spin size="3x" />
                    </div>
                ) : (
                    <SearchResults
                        searchData={searchData}
                        page={page}
                        useSearchParams={[searchParams, setSearchParams]}
                        navigation={navigation}
                    />
                )}
                <RawgAttribution />
            </main>
        </>
    )
}

export default Search
