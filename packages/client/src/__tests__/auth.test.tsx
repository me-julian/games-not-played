import { RouterProvider, createMemoryRouter } from 'react-router-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { routeObject } from '../App'

afterEach(() => {
    localStorage.removeItem('jwt')
})

describe('Basic Auth Flow', () => {
    describe('Signing in', () => {
        test('Signs in with good credentials', async () => {
            const user = userEvent.setup()

            render(<RouterProvider router={createMemoryRouter(routeObject)} />)

            expect(await screen.findByText('Welcome!')).toBeInTheDocument()

            await user.click(
                await screen.findByRole('link', { name: /sign in icon/i })
            )

            expect(
                await screen.findByRole('button', { name: /sign in/i })
            ).toBeInTheDocument()

            await user.type(await screen.findByLabelText(/username/i), 'julian')
            await user.type(
                await screen.findByLabelText(/password/i),
                'password'
            )

            await user.click(
                await screen.findByRole('button', { name: /sign in/i })
            )

            expect(
                await screen.findByRole('link', { name: /add game/i })
            ).toBeInTheDocument()
            expect(await screen.findByText('julian')).toBeInTheDocument()
        })

        test("doesn't allow signing in with wrong password", async () => {
            const user = userEvent.setup()

            render(<RouterProvider router={createMemoryRouter(routeObject)} />)

            expect(await screen.findByText('Welcome!')).toBeInTheDocument()

            await user.click(
                await screen.findByRole('link', { name: /sign in icon/i })
            )

            expect(
                await screen.findByRole('button', { name: /sign in/i })
            ).toBeInTheDocument()

            await user.type(await screen.findByLabelText(/username/i), 'julian')
            await user.type(
                await screen.findByLabelText(/password/i),
                'wrongpassword'
            )

            await user.click(
                await screen.findByRole('button', { name: /sign in/i })
            )

            expect(
                await screen.findByText('Incorrect username or password.')
            ).toBeInTheDocument()
        })
    })

    describe('Signing up', () => {
        test("doesn't allow signing up with existing username", async () => {
            const user = userEvent.setup()

            render(<RouterProvider router={createMemoryRouter(routeObject)} />)

            expect(await screen.findByText('Welcome!')).toBeInTheDocument()

            await user.click(
                await screen.findByRole('link', { name: /sign in icon/i })
            )

            await user.click(
                await screen.findByRole('link', { name: /sign up/i })
            )

            expect(
                await screen.findByRole('button', { name: /sign up/i })
            ).toBeInTheDocument()

            await user.type(await screen.findByLabelText(/username/i), 'julian')
            await user.type(
                await screen.findByLabelText(/password/i),
                'anypassword'
            )

            await user.click(
                await screen.findByRole('button', { name: /sign up/i })
            )

            expect(
                await screen.findByText('Username already in use.')
            ).toBeInTheDocument()
        })
    })

    describe('Signing out', () => {
        test('Signs out from nav', async () => {
            const user = userEvent.setup()

            render(<RouterProvider router={createMemoryRouter(routeObject)} />)

            expect(await screen.findByText('Welcome!')).toBeInTheDocument()

            await user.click(
                await screen.findByRole('link', { name: /sign in icon/i })
            )

            expect(
                await screen.findByRole('button', { name: /sign in/i })
            ).toBeInTheDocument()

            await user.type(await screen.findByLabelText(/username/i), 'julian')
            await user.type(
                await screen.findByLabelText(/password/i),
                'password'
            )

            await user.click(
                await screen.findByRole('button', { name: /sign in/i })
            )

            expect(
                await screen.findByRole('link', { name: /add game/i })
            ).toBeInTheDocument()
            expect(await screen.findByText('julian')).toBeInTheDocument()

            await user.click(
                await screen.findByRole('link', { name: /sign out icon/i })
            )

            expect(await screen.findByText('Welcome!'))
        })
    })
})
