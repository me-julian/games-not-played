import { cleanup, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { RouterProvider, createMemoryRouter } from 'react-router-dom'
import { routeObject } from './appRouteObject'

afterEach(cleanup)

test('the api url env var is set', async () => {
    expect(import.meta.env.VITE_API_URL).not.toBeUndefined()
})

test('loads root page', async () => {
    const router = createMemoryRouter([routeObject], {
        initialEntries: ['/'],
        initialIndex: 0,
    })

    render(<RouterProvider router={router} />)

    expect(
        await screen.findByText('Log in to view this info!')
    ).toBeInTheDocument()
})

test('navigates from root to about page', async () => {
    const user = userEvent.setup()

    const router = createMemoryRouter([routeObject], {
        initialEntries: ['/'],
        initialIndex: 0,
    })

    render(<RouterProvider router={router} />)

    expect(await screen.findByText('Generic Information')).toBeInTheDocument()

    user.click(await screen.findByText('About'))

    expect(await screen.findByText('About this project')).toBeInTheDocument()
})

test('logged in', async () => {
    const user = userEvent.setup()

    const router = createMemoryRouter([routeObject], {
        initialEntries: ['/'],
        initialIndex: 0,
    })

    render(<RouterProvider router={router} />)

    expect(await screen.findByText('Generic Information')).toBeInTheDocument()

    user.click(await screen.findByText('About'))

    expect(await screen.findByText('About this project')).toBeInTheDocument()
})

// test('navigates from root to sign in page', async () => {
//     const user = userEvent.setup()

//     const router = createMemoryRouter([routeObject], {
//         initialEntries: ['/'],
//         initialIndex: 0,
//     })

//     render(<RouterProvider router={router} />)

//     expect(await screen.findByText('Generic Information')).toBeInTheDocument()

//     user.click(await screen.findByText('Login'))

//     expect(await screen.findByText('Sign in')).toBeInTheDocument()
// })
