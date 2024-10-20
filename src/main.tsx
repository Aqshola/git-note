import React from 'react'
import ReactDOM from 'react-dom/client'
import '@/style/main.css'
import { RouterProvider } from 'react-router-dom'
import routes from '@/routes/routes'
import { initRxDb } from './libs/rxDb'







async function main() {
  await initRxDb()

  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <RouterProvider router={routes} />
    </React.StrictMode>
  )
}

main()
