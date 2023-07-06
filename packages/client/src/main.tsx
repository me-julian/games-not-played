// React
import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
// CSS
import 'bootstrap/dist/css/bootstrap.min.css'
import './public/styles.css'
import { routeObject } from './appRouteObject'

const router = createBrowserRouter([routeObject])

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
)
