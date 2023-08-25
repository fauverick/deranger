import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './style.css'
import { BrowserRouter } from 'react-router-dom'
import { ContextProvider } from './context/Context'

ReactDOM.createRoot(document.getElementById('root')).render(
  <ContextProvider>
     <BrowserRouter>
      <App />
    </BrowserRouter>
  </ContextProvider>
 ,
)
