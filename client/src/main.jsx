import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './Pages/Context/AuthContext.jsx'
import { CaseProvider } from './Pages/Context/CaseContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AuthProvider>
      <CaseProvider>
      <App />
      </CaseProvider>
    </AuthProvider>
  </BrowserRouter>
)
