import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import ErrorPage from './ErrorPage'
import About from './routes/About'
import Home from './routes/Home'
import Root, { RootLoader } from './routes/Root'
import Signin, { signinAction } from './routes/Signin'
import Signup, { signupAction } from './routes/Signup'

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
        ],
    },
]

function App() {
    return <RouterProvider router={createBrowserRouter(routeObject)} />
}

export default App
