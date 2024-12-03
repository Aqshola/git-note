import React from 'react'
import ReactDOM from 'react-dom/client'
import '@/style/main.css'
import { RouterProvider } from 'react-router-dom'
import routes from '@/routes/routes'
import { initRxDb } from './libs/rxDb'
import initReplication from './libs/rxReplica'







async function main() {
  await initRxDb()
  await initReplication()

  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <RouterProvider router={routes} />
    </React.StrictMode>
  )
}

main()
