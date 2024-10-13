import React from 'react'
import ReactDOM from 'react-dom/client'
import '@/style/reset.css'
import '@/style/main.css'
import { RouterProvider } from 'react-router-dom'
import routes from '@/routes/routes'
import { initDb } from './libs/pouchDb'


initDb()


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={routes} />
  </React.StrictMode>
)
