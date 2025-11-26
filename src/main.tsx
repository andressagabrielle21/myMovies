import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { LikedMovieListProvider, MovieListProvider } from './context/MovieListProvider.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MovieListProvider>
      <LikedMovieListProvider>
        <App />
      </LikedMovieListProvider>
    </MovieListProvider>
  </StrictMode>,
)
