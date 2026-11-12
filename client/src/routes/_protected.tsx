import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'
import { ProtectedProviders } from 'app/protected-providers';

export const Route = createFileRoute('/_protected')({
    component: () => (
        <ProtectedProviders>
            <Outlet />
        </ProtectedProviders>
    ),
    beforeLoad: ({ context, location }) => {
        if (!context.auth) {
            throw redirect({
                to: '/login',
                search: { redirect: location.pathname }
            })
        }
    }
})

