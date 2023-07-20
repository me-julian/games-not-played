import { render, screen } from './test-utils'
import userEvent from '@testing-library/user-event'
import { TestApp } from '../App'

test('the api url env var is set', async () => {
    expect(import.meta.env.VITE_API_URL).not.toBeUndefined()
})

describe('React Router Navigation', () => {
    test('loads root page', async () => {
        render(<TestApp />)

        expect(
            await screen.findByText('Log in to view this info!')
        ).toBeInTheDocument()
    })

    test('navigates from root to about page', async () => {
        const user = userEvent.setup()

        render(<TestApp />)

        expect(
            await screen.findByText('Generic Information')
        ).toBeInTheDocument()

        user.click(await screen.findByText('About'))

        expect(
            await screen.findByText('About this project')
        ).toBeInTheDocument()
    })
})
