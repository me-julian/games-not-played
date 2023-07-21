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
import Root, { RootLoader } from './routes/Root'
import Signup from './routes/Signup'
import { AuthContext, loginAction, signupAction, useAuth } from './AuthContext'
import { increaseTickerAction } from './components/UserPreview'

export const routeObject = (authContext: AuthContext): RouteObject => {
    return {
        path: '/',
        id: 'root',
        element: <Root />,
        loader: RootLoader(authContext),
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
                action: signupAction(authContext),
            },
            {
                path: '/users/:userId/ticker',
                action: increaseTickerAction(authContext),
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
