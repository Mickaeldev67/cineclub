import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './components/App.tsx'
import Home from './components/Home.tsx'
import PrivateRoute from './components/PrivateRoute.tsx'
import Account from './components/Account.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />      {/* Page de connexion */}
        <Route element={<PrivateRoute />}>
          <Route path="/home" element={<Home />} /> {/* Page d'accueil */}
          <Route path="/account" element={<Account />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
