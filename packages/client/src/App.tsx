import {
    RouterProvider,
    createBrowserRouter,
    type ActionFunctionArgs,
} from 'react-router-dom'
import ErrorPage from './ErrorPage'
import About from './routes/About'
import Home, { homeLoader } from './routes/Home'
import Root from './routes/Root'
import Signin, { signinAction } from './routes/Signin'
import Signup, { signupAction } from './routes/Signup'
import Search, { search, loadSearch, addToList } from './routes/Search'

export const routeObject = [
    {
        path: '/',
        id: 'root',
        element: <Root />,
        errorElement: <ErrorPage />,
        children: [
            {
                index: true,
                element: <Home />,
                loader: homeLoader,
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
