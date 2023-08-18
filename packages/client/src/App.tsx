import {
    RouterProvider,
    createBrowserRouter,
    type ActionFunctionArgs,
} from 'react-router-dom'
import ErrorPage from './ErrorPage'
import Root, { rootLoader } from './routes/Root'
import Home, { reorderList } from './routes/Home'
import About from './routes/About'
import Signin, { signinAction } from './routes/Signin'
import Signup, { signupAction } from './routes/Signup'
import Search, { search, loadSearch, addToList } from './routes/Search'
import Details, { deleteEntry, editEntry } from './routes/Details'
import Random from './routes/Random'

export const routeObject = [
    {
        path: '/',
        id: 'root',
        element: <Root />,
        errorElement: <ErrorPage />,
        loader: rootLoader,
        action: reorderList,
        children: [
            {
                index: true,
                element: <Home />,
            },
            {
                path: '/details/:entryId',
                element: <Details />,
                action: async ({ request, params }: ActionFunctionArgs) => {
                    switch (request.method) {
                        case 'DELETE':
                            return deleteEntry({ request, params })
                        case 'PATCH':
                            return editEntry({ request, params })
                    }
                },
            },
            {
                path: '/random',
                element: <Random />,
            },
            {
                path: '/search',
                element: <Search />,
                loader: loadSearch,
                action: async ({ request, params }: ActionFunctionArgs) => {
                    switch (request.method) {
                        case 'GET':
                            return search({ request, params })
                        case 'POST':
                            return addToList({ request, params })
                    }
                },
            },
            {
                path: '/about',
                element: <About />,
            },
            {
                path: '/signin',
                element: <Signin />,
                action: signinAction,
            },
            {
                path: '/signup',
                element: <Signup />,
                action: signupAction,
            },
        ],
    },
]

function App() {
    return <RouterProvider router={createBrowserRouter(routeObject)} />
}

export default App
