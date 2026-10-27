import { createRootRoute, Outlet } from '@tanstack/react-router'
import { Providers } from 'app/providers'



const RootLayout = () => {
    return (
        <Providers>
            <Outlet />
        </Providers>
    )
}

export const Route = createRootRoute({ component: RootLayout })