import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter as Router } from 'react-router-dom'

import './index.css'
import App from './App'
import { NotificationContextProvider } from './NotificationContext'
import { UserContextProvider } from './UserContext'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <NotificationContextProvider>
        <UserContextProvider>
          <Router>
            <App />
          </Router>
        </UserContextProvider>
      </NotificationContextProvider>
    </QueryClientProvider>
  </StrictMode>
)
