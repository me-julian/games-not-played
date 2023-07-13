import { RouteObject } from 'react-router-dom'
import ErrorPage from './ErrorPage'
import About from './routes/About'
import Home from './routes/Home'
import Login, { loginAction } from './routes/Login'
import Root, { rootLoader } from './routes/Root'
import Signup, { signupAction } from './routes/Signup'

export const routeObject: RouteObject = {
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
            path: '/about',
            element: <About />,
        },
        {
            path: '/login',
            element: <Login />,
            action: loginAction,
        },
        {
            path: '/signup',
            element: <Signup />,
            action: signupAction,
        },
    ],
}
