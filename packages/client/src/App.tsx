import {
    RouteObject,
    RouterProvider,
    createBrowserRouter,
    createMemoryRouter,
} from 'react-router-dom'
import ErrorPage from './ErrorPage'
import About from './routes/About'
import Home from './routes/Home'
import Login from './routes/Login'
import Root from './routes/Root'
import Signup, { signupAction } from './routes/Signup'
import { AuthContext, loginAction, useAuth } from './AuthContext'

export const routeObject = (authContext: AuthContext): RouteObject => {
    return {
        path: '/',
        id: 'root',
        element: <Root />,
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
                path: '/login',
                element: <Login />,
                action: loginAction(authContext),
            },
            {
                path: '/signup',
                element: <Signup />,
                action: signupAction,
            },
        ],
    }
}

function App() {
    const authContext = useAuth()

    return (
        <RouterProvider
            router={createBrowserRouter([routeObject(authContext)])}
        />
    )
}

export function TestApp() {
    const authContext = useAuth()

    return (
        <RouterProvider
            router={createMemoryRouter([routeObject(authContext)])}
        />
    )
}

export default App
