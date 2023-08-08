import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

export async function testLogin(
    user: ReturnType<typeof userEvent.setup>,
    username: string,
    password: string
) {
    expect(await screen.findByText('Welcome!')).toBeInTheDocument()

    await user.click(await screen.findByRole('link', { name: /sign in icon/i }))

    expect(
        await screen.findByRole('button', { name: /sign in/i })
    ).toBeInTheDocument()

    await user.type(await screen.findByLabelText(/username/i), username)
    await user.type(await screen.findByLabelText(/password/i), password)

    await user.click(await screen.findByRole('button', { name: /sign in/i }))

    expect(
        await screen.findByRole('link', { name: /add game/i })
    ).toBeInTheDocument()
    expect(await screen.findByText(username)).toBeInTheDocument()
}
