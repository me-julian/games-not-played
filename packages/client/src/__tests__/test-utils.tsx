import React from 'react'
import { RenderOptions, render } from '@testing-library/react'
import AuthProvider from '../AuthContext'

const Providers = ({ children }: { children: React.ReactNode }) => {
    return <AuthProvider>{children}</AuthProvider>
}

type Options = RenderOptions<
    typeof import('@testing-library/dom/types/queries'),
    HTMLElement,
    HTMLElement
>

const customRender = (ui: React.ReactElement, options?: Options) => {
    return render(ui, { wrapper: Providers, ...options })
}

export * from '@testing-library/react'
export { customRender as render }
