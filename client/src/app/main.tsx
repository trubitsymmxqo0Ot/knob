import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'shared/styles/global.css'

import { routeTree } from '../routeTree.gen'
import { createRouter, RouterProvider } from '@tanstack/react-router'
import { StyleProvider } from './style-provider'
import { NotFoundPage } from 'pages/not-found.page'

const router = createRouter({ routeTree, defaultNotFoundComponent: () => (
  <StyleProvider>
    <NotFoundPage/>
  </StyleProvider>
) })

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
