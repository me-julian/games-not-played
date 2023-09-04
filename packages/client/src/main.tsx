import React from 'react'
import ReactDOM from 'react-dom/client'
import './public/css/reset.css'
import './public/css/util.css'
import './public/css/root.css'
import './public/css/buttons.css'
import App from './App'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
)
