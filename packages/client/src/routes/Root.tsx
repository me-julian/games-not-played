import { ActionFunctionArgs, Outlet, redirect } from 'react-router-dom'
import { getJwt } from '../auth'

export type RootLoaderData = string | null

export async function RootLoader() {
    const jwt = getJwt()

    if (jwt) {
        // const response = await fetch(`${import.meta.env.VITE_API_URL}`, {
        //     method: 'GET',
        //     headers: {
        //         Authorization: 'Bearer ' + jwt,
        //     },
        // })
        const response = new Response('rootData', { status: 200 })

        if (response.ok) {
            return response
        } else {
            throw new Response('Issue getting data from the server.', response)
        }
    } else {
        return new Response(null)
    }
}

// export async function increaseTickerAction({ params }: ActionFunctionArgs) {
//     const jwt = getJwt()

//     const response = await fetch(
//         `${import.meta.env.VITE_API_URL}/users/${params.userId}/ticker`,
//         {
//             method: 'PATCH',
//             headers: {
//                 Authorization: `Bearer ${jwt}`,
//             },
//         }
//     )

//     if (response.ok) {
//         return redirect('/')
//     } else if (response.status === 401) {
//         console.warn(
//             'Failed to authenticate on user action. Logging out client.'
//         )
//         localStorage.removeItem('jwt')
//         return redirect('/login')
//     } else {
//         throw new Response('Issue increasing ticker value', response)
//     }
// }

function Root() {
    return (
        <>
            <Outlet />
        </>
    )
}

export default Root
