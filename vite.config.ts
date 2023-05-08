import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    base: './',
    root: './packages/client',
    build: {
        outDir: '../../dist/packages/client',
    },
})
