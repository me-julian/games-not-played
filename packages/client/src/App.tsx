import {
    RouterProvider,
    createBrowserRouter,
    type ActionFunctionArgs,
} from 'react-router-dom'
import ErrorPage from './ErrorPage'
import Root, { rootLoader } from './routes/Root'
import Home from './routes/Home'
import About from './routes/About'
import Signin, { signinAction } from './routes/Signin'
import Signup, { signupAction } from './routes/Signup'
import Search, { search, loadSearch, addToList } from './routes/Search'
import Details, { deleteEntry, editEntry } from './routes/Details'

export const routeObject = [
    {
        path: '/',
        id: 'root',
        element: <Root />,
        errorElement: <ErrorPage />,
        loader: rootLoader,
        children: [
            {
                index: true,
                element: <Home />,
            },
            {
                path: '/details/:entryId',
                element: <Details />,
                action: async ({ request, params }: ActionFunctionArgs) => {
                    console.log('switching action')
                    console.log(request.method)
                    switch (request.method) {
                        case 'DELETE':
                            return deleteEntry({ request, params })
                        case 'PATCH':
                            console.log('switch says patch')
                            return editEntry({ request, params })
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
        ],
    },
]

function App() {
    return <RouterProvider router={createBrowserRouter(routeObject)} />
}

export default App
