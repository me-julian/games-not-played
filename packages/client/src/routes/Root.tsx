import { Outlet } from 'react-router-dom'
import Footer from '../components/Footer'
import { AuthContext } from '../AuthContext'

export type RootLoaderData = {
    tickerValue: number
} | null

export const RootLoader = ({ jwt, parseJwt }: AuthContext) =>
    async function () {
        if (jwt) {
            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/api/users/${
                    parseJwt(jwt).id
                }/ticker`,
                {
                    method: 'GET',
                    headers: {
                        Authorization: 'Bearer ' + jwt,
                    },
                }
            )

            if (response.ok) {
                return response
            } else {
                throw new Response(
                    'Issue getting data from the server.',
                    response
                )
            }
        } else {
            return new Response(null)
        }
    }

function Root() {
    return (
        <>
            <Outlet />
            <Footer />
        </>
    )
}

export default Root
