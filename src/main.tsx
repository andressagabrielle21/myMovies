import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import LikedMoviesProvider from './context/LikedMoviesProvider.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LikedMoviesProvider>
      <App />
    </LikedMoviesProvider>
  </StrictMode>,
)
