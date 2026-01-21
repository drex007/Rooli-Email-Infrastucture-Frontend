import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { AppContextProvider } from './ContextAPI.jsx'
import { Toaster } from 'react-hot-toast'
import { Provider } from 'react-redux'



createRoot(document.getElementById('root')).render(
  <StrictMode>
      <AppContextProvider>
        <App />
        <Toaster position='top-right' />
      </AppContextProvider>
  </StrictMode>
)
