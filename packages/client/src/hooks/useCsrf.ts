import { useState, useEffect } from 'react'

export default function useCsrf(): {
    csrfToken: string
} {
    const [csrfToken, setCsrfToken] = useState('')

    async function getCSRFToken(abortController: AbortController) {
        const request = await fetch('/csrf-token', {
            method: 'GET',
            signal: abortController.signal,
        })

        const data = await request.json()

        setCsrfToken(data.token)
    }

    useEffect(() => {
        const abortController = new AbortController()

        getCSRFToken(abortController)

        return () => {
            abortController.abort()
        }
    }, [])

    return { csrfToken }
}
