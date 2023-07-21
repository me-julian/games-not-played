import { Outlet } from 'react-router-dom'
import Footer from '../components/Footer'
import { AuthContext } from '../AuthContext'

export type RootLoaderData = {
    tickerValue: number
} | null

export const RootLoader = ({ jwt, parseJwt }: AuthContext) =>
    async function (): Promise<RootLoaderData> {
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

            const resData = await response.json()

            if (response.ok) {
                return { tickerValue: resData.tickerValue }
            } else {
                throw new Response(
                    'Issue getting data from the server.',
                    response
                )
            }
        } else {
            return null
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
