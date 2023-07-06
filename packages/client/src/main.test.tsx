import { render, screen } from '@testing-library/react'
import { RouterProvider, createMemoryRouter } from 'react-router-dom'
import { routeObject } from './appRouteObject'

test('the api url env var is set', async () => {
    expect(import.meta.env.VITE_API_URL).not.toBeUndefined()
})

// Doesn't actually wait for the page to load.
// Partially could be an issue of needing better loading behavior,
// partially just needs to be improved.
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
