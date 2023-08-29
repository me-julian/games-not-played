import '../public/component-css/filter.css'
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
                <div id="filter-options">
                    <span className="toggle-btn">
                        <input
                            className="sr-only"
                            type="radio"
                            name="filter-by-custom-order"
                            id="filter-by-custom-order"
                            value={'Custom'}
                            checked={currentFilter.state === 'custom'}
                            onChange={() => currentFilter.setter('custom')}
                        />
                        <label htmlFor="filter-by-custom-order">Custom</label>
                    </span>
                    <span className="toggle-btn">
                        <input
                            className="sr-only"
                            type="radio"
                            name="filter-by-owned"
                            id="filter-by-owned"
                            value={'Owned'}
                            checked={currentFilter.state === 'owned'}
                            onChange={() => currentFilter.setter('owned')}
                        />
                        <label htmlFor="filter-by-owned">Owned</label>
                    </span>
                    <span className="toggle-btn">
                        <input
                            className="sr-only"
                            type="radio"
                            name="filter-by-length"
                            id="filter-by-length"
                            value={'Length'}
                            checked={currentFilter.state === 'length'}
                            onChange={() => currentFilter.setter('length')}
                        />
                        <label htmlFor="filter-by-length">Average Length</label>
                        {currentFilter.state === 'length' && (
                            <span className="toggle-btn swap">
                                <input
                                    className="sr-only"
                                    type="checkbox"
                                    name="filter-order"
                                    id="filter-order"
                                    value={filterDirection.state}
                                    checked={
                                        filterDirection.state === 'asc'
                                            ? false
                                            : true
                                    }
                                    onChange={() =>
                                        filterDirection.setter(
                                            filterDirection.state === 'asc'
                                                ? 'desc'
                                                : 'asc'
                                        )
                                    }
                                />
                                <label htmlFor="filter-order">
                                    {filterDirection.state.toUpperCase()}
                                </label>
                            </span>
                        )}
                    </span>
                    <span className="toggle-btn">
                        <input
                            className="sr-only"
                            type="radio"
                            name="filter-by-date-added"
                            id="filter-by-date-added"
                            value={'Date Added'}
                            checked={currentFilter.state === 'dateAdded'}
                            onChange={() => currentFilter.setter('dateAdded')}
                        />
                        <label htmlFor="filter-by-date-added">Date Added</label>
                        {currentFilter.state === 'dateAdded' && (
                            <span className="toggle-btn swap">
                                <input
                                    className="sr-only"
                                    type="checkbox"
                                    name="filter-order"
                                    id="filter-order"
                                    value={filterDirection.state}
                                    checked={
                                        filterDirection.state === 'asc'
                                            ? false
                                            : true
                                    }
                                    onChange={() =>
                                        filterDirection.setter(
                                            filterDirection.state === 'asc'
                                                ? 'desc'
                                                : 'asc'
                                        )
                                    }
                                />
                                <label htmlFor="filter-order">
                                    {filterDirection.state.toUpperCase()}
                                </label>
                            </span>
                        )}
                    </span>
                </div>
                <div className="fixed-action">
                    <Link className="button-wrapper" to={'/'}>
                        <button className="action-btn">Confirm</button>
                    </Link>
                </div>
            </>
        )
    }
}

export default Filter
