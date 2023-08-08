import { RouterProvider, createMemoryRouter } from 'react-router-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { routeObject } from '../App'
import { testLogin } from './util'

afterEach(() => {
    localStorage.removeItem('jwt')
})

describe('Search', () => {
    describe('search dummy data & add game to list', () => {
        test('search "dark souls" and add to list', async () => {
            const user = userEvent.setup()

            render(<RouterProvider router={createMemoryRouter(routeObject)} />)

            const username = 'julian',
                password = 'password'
            await testLogin(user, username, password)

            expect(await screen.findByText(username)).toBeInTheDocument()
            expect(
                await screen.findByText('Europa Universalis IV')
            ).toBeInTheDocument()

            let addGameIcon = await screen.findByRole('link', {
                name: /add game/i,
            })
            expect(addGameIcon).toBeInTheDocument()
            await user.click(addGameIcon)

            let searchBar = await screen.findByLabelText(/search/i)
            expect(searchBar).toBeInTheDocument()
            await user.type(searchBar, 'dark souls')

            await user.click(
                await screen.findByRole('button', { name: /search/i })
            )

            await user.click(await screen.findByText(/dark souls/i))

            expect(
                await screen.findByRole('link', { name: /add game/i })
            ).toBeInTheDocument()
            expect(await screen.findByText(/dark souls/i)).toBeInTheDocument()
        })
    })
})
