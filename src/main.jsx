import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { LightThemeProvider } from './context/LightThemeContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <LightThemeProvider>
        <App />
      </LightThemeProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
