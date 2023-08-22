import {
    Link,
    Navigate,
    useOutletContext,
    useRouteLoaderData,
} from 'react-router-dom'
import ActionNav from '../components/ActionNav'
import { type RootOutletContext, type RootLoaderData } from './Root'

function Filter() {
    const rootLoaderData = useRouteLoaderData('root') as RootLoaderData
    if (!rootLoaderData) {
        return <Navigate to={'/login'} />
    } else {
        const { currentFilter, filterDirection } =
            useOutletContext() as RootOutletContext

        return (
            <>
                <ActionNav actionName="Filter" />
                <span>
                    <label htmlFor="filter-by-custom-order">
                        <input
                            type="radio"
                            name="filter-by-custom-order"
                            id="filter-by-custom-order"
                            value={'Custom'}
                            checked={currentFilter.state === 'custom'}
                            onChange={() => currentFilter.setter('custom')}
                        />
                        Custom
                    </label>
                </span>
                <span>
                    <label htmlFor="filter-by-owned">
                        <input
                            type="radio"
                            name="filter-by-owned"
                            id="filter-by-owned"
                            value={'Owned'}
                            checked={currentFilter.state === 'owned'}
                            onChange={() => currentFilter.setter('owned')}
                        />
                        Owned
                    </label>
                </span>
                <span>
                    <label htmlFor="filter-by-length">
                        <input
                            type="radio"
                            name="filter-by-length"
                            id="filter-by-length"
                            value={'Length'}
                            checked={currentFilter.state === 'length'}
                            onChange={() => currentFilter.setter('length')}
                        />
                        Length
                    </label>
                </span>
                <span>
                    <label htmlFor="filter-by-date-added">
                        <input
                            type="radio"
                            name="filter-by-date-added"
                            id="filter-by-date-added"
                            value={'Date Added'}
                            checked={currentFilter.state === 'dateAdded'}
                            onChange={() => currentFilter.setter('dateAdded')}
                        />
                        Date Added
                    </label>
                </span>
                <span>
                    <label htmlFor="filter-order">Sort By: </label>
                    {filterDirection.state.toUpperCase()}
                    <input
                        type="checkbox"
                        name="filter-order"
                        id="filter-order"
                        value={filterDirection.state}
                        checked={filterDirection.state === 'asc' ? false : true}
                        onChange={() =>
                            filterDirection.setter(
                                filterDirection.state === 'asc' ? 'desc' : 'asc'
                            )
                        }
                    />
                </span>
                <Link to={'/'}>
                    <button>Confirm</button>
                </Link>
            </>
        )
    }
}

export default Filter
