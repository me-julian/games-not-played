import { RAWG } from '@games-not-played/types'
import SearchEntry from './SearchEntry'
import {
    useSubmit,
    useSearchParams,
    useActionData,
    Navigation,
} from 'react-router-dom'
import { type SearchLoaderData } from '../routes/Search'

type Props = {
    searchData: SearchLoaderData
    page: number
    // React Router doesn't seem to export the type of setSearchParams.
    useSearchParams: ReturnType<typeof useSearchParams>
    navigation: Navigation
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

function SearchResults({
    searchData,
    page,
    useSearchParams,
    navigation,
}: Props) {
    const actionResponse = useActionData()

    const submit = useSubmit()
    const [searchParams, setSearchParams] = useSearchParams

    function handleSelect(event: any) {
        submit(event.currentTarget)
    }

    return (
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
                            <SearchEntry
                                key={result.id}
                                id={result.id}
                                name={result.name}
                                playtime={result.playtime}
                                backgroundImage={result.background_image}
                                updated={result.updated}
                                onSelect={handleSelect}
                                navigation={navigation}
                            />
                        ))}
                        <div className="page-navigation">
                            {(searchData.previous || searchData.next) && (
                                <>
                                    <div className="page-number">
                                        Page {page}
                                    </div>
                                    <div className="page-buttons">
                                        <button
                                            disabled={!searchData.previous}
                                            onClick={() => {
                                                searchParams.set(
                                                    'page',
                                                    (page - 1).toString()
                                                )
                                                setSearchParams(searchParams)
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
                                                setSearchParams(searchParams)
                                            }}
                                        >
                                            Next Page
                                        </button>
                                    </div>
                                </>
                            )}
                            <sub className="result-count">
                                {searchData.count} results found.
                            </sub>
                        </div>
                    </>
                ) : (
                    <p>
                        There was an issue finding any results for your search.
                    </p>
                ))}
        </>
    )
}

export default SearchResults
