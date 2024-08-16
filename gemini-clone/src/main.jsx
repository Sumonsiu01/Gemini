import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import Main from './comonents/main/Main.jsx'
import ContextProvider from './context/context.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
    <ContextProvider>
    <App />
    </ContextProvider>
)
