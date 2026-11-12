import { StrictMode, useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import 'shared/styles/global.css'

import { routeTree } from '../routeTree.gen'
import { createRouter, RouterProvider } from '@tanstack/react-router'
import { RootProviders } from './root-providers'
import { NotFoundPage } from 'pages/not-found.page'
import { AuthProvider } from 'shared/ui/auth/auth-context'
import { refreshApi, type ResponseRefreshDto } from 'entities/refresh'

const router = createRouter({
  routeTree,
  defaultNotFoundComponent: () => (
    <RootProviders>
      <NotFoundPage />
    </RootProviders>
  ),
  context: { auth: null }
})

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

function InnerApp() {
  const [isLogin, setIsLogin] = useState(false);
  const [user, setUser] = useState<ResponseRefreshDto | undefined>();
  useEffect(() => {
    const getUser = async () => {
      const data = await refreshApi.refresh();
      if (data) {
        setIsLogin(true);
        setUser(data);
      }
    }
    getUser();
  }, [])

  useEffect(() => {
    void router.invalidate();
  }, [isLogin])
  return (
    <AuthProvider
      isLogin={isLogin}
      setIsLogin={setIsLogin}
      email={user?.email}
      name={user?.name}
      createdAt={user?.createdAt}
    >
      <RouterProvider router={router} context={{ auth: isLogin }} />
    </AuthProvider>
  )
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <InnerApp />
  </StrictMode>,
)
