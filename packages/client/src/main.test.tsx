import { cleanup, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { RouterProvider, createMemoryRouter } from 'react-router-dom'
import { routeObject } from './appRouteObject'
import Cookie from 'js-cookie'

test('the api url env var is set', async () => {
    expect(import.meta.env.VITE_API_URL).not.toBeUndefined()
})

beforeEach(() => {
    // Cookie.remove('connect.sid')

    return () => {
        cleanup()
    }
})

// describe('React Router Navigation', () => {
//     test('loads root page', async () => {
//         const router = createMemoryRouter([routeObject], {
//             initialEntries: ['/'],
//             initialIndex: 0,
//         })

//         render(<RouterProvider router={router} />)

//         expect(
//             await screen.findByText('Log in to view this info!')
//         ).toBeInTheDocument()
//     })

//     test('navigates from root to about page', async () => {
//         const user = userEvent.setup()

//         const router = createMemoryRouter([routeObject], {
//             initialEntries: ['/'],
//             initialIndex: 0,
//         })

//         render(<RouterProvider router={router} />)

//         expect(
//             await screen.findByText('Generic Information')
//         ).toBeInTheDocument()

//         user.click(await screen.findByText('About'))

//         expect(
//             await screen.findByText('About this project')
//         ).toBeInTheDocument()
//     })
// })

describe('Auth flow', () => {
    test('logs in with good credentials', async () => {
        const user = userEvent.setup()

        const router = createMemoryRouter([routeObject])

        render(<RouterProvider router={router} />)

        expect(
            await screen.findByText('Generic Information')
        ).toBeInTheDocument()

        await user.click(await screen.findByRole('link', { name: /login/i }))

        expect(
            await screen.findByRole('button', { name: /Sign in/i })
        ).toBeInTheDocument()

        await user.type(await screen.findByLabelText(/username/i), 'julian')
        await user.type(await screen.findByLabelText(/password/i), 'password')

        await user.click(
            await screen.findByRole('button', { name: /Sign in/i })
        )

        expect(
            await screen.findByText('Generic Information')
        ).toBeInTheDocument()
        expect(await screen.findByText('julian')).toBeInTheDocument()
    })
})
