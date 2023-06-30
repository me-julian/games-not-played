import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    base: './',
    root: './packages/client',
    define: {
        __API_URL__: JSON.stringify(process.env.VITE_API_URL),
    },
})
