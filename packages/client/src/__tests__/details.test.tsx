import { RouterProvider, createMemoryRouter } from 'react-router-dom'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { routeObject } from '../App'
import { testLogin } from './util'

afterEach(() => {
    localStorage.removeItem('jwt')
})

describe('Entry details', () => {
    describe('Delete entry', () => {
        test('Delete entry "factorio" from list', async () => {
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
            await user.type(searchBar, 'factorio')

            await user.click(
                await screen.findByRole('button', { name: /search/i })
            )

            await user.click(await screen.findByText(/^factorio$/i))

            expect(
                await screen.findByRole('link', { name: /add game/i })
            ).toBeInTheDocument()
            expect(await screen.findByText(/^factorio$/i)).toBeInTheDocument()

            await user.click(await screen.findByText(/^factorio$/i))

            expect(await screen.findByText(/^factorio$/i)).toBeInTheDocument()
            await user.click(
                await screen.findByRole('button', { name: /delete/i })
            )

            expect(
                await screen.findByRole('link', { name: /add game/i })
            ).toBeInTheDocument()
            waitFor(() => {
                expect(
                    screen.queryByText(/^factorio$/i)
                ).not.toBeInTheDocument()
            })
        })
    })
})
