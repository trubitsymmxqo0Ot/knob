import { createRootRouteWithContext, Outlet } from '@tanstack/react-router'
import { DefaultProviders } from 'app/default-providers';

export interface ContextApi {
    auth: boolean | null;
}

const RootLayout = () => {
    return (
        <DefaultProviders>
            <Outlet />
        </DefaultProviders>
    )
}

export const Route = createRootRouteWithContext<ContextApi>()({ 
    component: RootLayout, 
})