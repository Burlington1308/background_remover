import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import BackgroundRemover from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BackgroundRemover />
  </StrictMode>,
)
