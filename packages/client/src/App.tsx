import {
    RouterProvider,
    createBrowserRouter,
    type ActionFunctionArgs,
} from 'react-router-dom'
import ErrorPage from './ErrorPage'
import About from './routes/About'
import Home from './routes/Home'
import Root, { RootLoader } from './routes/Root'
import Signin, { signinAction } from './routes/Signin'
import Signup, { signupAction } from './routes/Signup'
import Search, { search, loadSearch, addToList } from './routes/Search'
// import {  } from './components/SearchResult'

export const routeObject = [
    {
        path: '/',
        id: 'root',
        element: <Root />,
        loader: RootLoader,
        errorElement: <ErrorPage />,
        children: [
            {
                index: true,
                element: <Home />,
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
