import { useEffect, useState } from 'react'
import './App.css'
import HomePage from './pages/HomePage.jsx'
import SubscriptionPlatformPage from './pages/subscription/SubscriptionPlatformPage.jsx'
import SignInPage from './pages/auth/SignInPage.jsx'
import SignUpPage from './pages/auth/SignUpPage.jsx'
import DashboardPage from './pages/dashboard/DashboardPage.jsx'
import { getCurrentPage } from './utils/navigation.js'

function App() {
  const [page, setPage] = useState(() => getCurrentPage())

  useEffect(() => {
    const onPop = () => setPage(getCurrentPage())
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [])

  if (page === 'pricing') return <SubscriptionPlatformPage />
  if (page === 'signin') return <SignInPage />
  if (page === 'signup') return <SignUpPage />
  if (page === 'dashboard') return <DashboardPage />
  return <HomePage />
}

export default App
