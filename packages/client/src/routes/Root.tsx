import { Outlet } from 'react-router-dom'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import useCsrf from '../hooks/useCsrf'

function Root() {
    const { csrfToken } = useCsrf()

    return (
        <>
            <Nav csrfToken={csrfToken} />
            <Outlet />
            <Footer />
        </>
    )
}

export default Root
