// React
import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
// Components
import Root, { rootLoader } from './routes/Root'
import Home from './routes/Home'
import About from './routes/About'
import ErrorPage from './ErrorPage'
// CSS
import 'bootstrap/dist/css/bootstrap.min.css'
import './public/styles.css'

const router = createBrowserRouter([
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
                path: '/about',
                element: <About />,
            },
        ],
    },
])

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
)
