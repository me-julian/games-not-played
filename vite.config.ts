/// <reference types="vitest" />

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    base: './',
    envDir: '../../',
    root: './packages/client',
    test: {
        globals: true,
        environment: 'jsdom',
        setupFiles: ['./vitest-setup.ts'],
    },
})
