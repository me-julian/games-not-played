import { RouterProvider, createMemoryRouter } from 'react-router-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { routeObject } from '../App'

test('the api url env var is set', async () => {
    expect(import.meta.env.VITE_API_URL).not.toBeUndefined()
})

describe('React Router Navigation', () => {
    test('loads home page unauthed', async () => {
        render(<RouterProvider router={createMemoryRouter(routeObject)} />)

        expect(await screen.findByText('Welcome!')).toBeInTheDocument()
    })

    test('navigates from home to about page', async () => {
        const user = userEvent.setup()

        render(<RouterProvider router={createMemoryRouter(routeObject)} />)

        expect(await screen.findByText('Welcome!')).toBeInTheDocument()

        user.click(
            await screen.findByRole('link', { name: /games not played/i })
        )

        expect(await screen.findByText('About')).toBeInTheDocument()
    })
})
