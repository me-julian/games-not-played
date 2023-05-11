import { Outlet } from 'react-router-dom'
import Nav from '../components/Nav'

function Root() {
    return (
        <>
            <Nav />
            <Outlet />
        </>
    )
}

export default Root
