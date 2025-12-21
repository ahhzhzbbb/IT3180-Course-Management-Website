import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/global.css' // Ensure global styles are imported
import App from './App.jsx'
import { LanguageProvider } from './context/LanguageProvider'
import { ThemeProvider } from './context/ThemeProvider'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <LanguageProvider>
        <App />
      </LanguageProvider>
    </ThemeProvider>
  </StrictMode>,
)