import type { FileRoutesByFullPath } from "src/routeTree.gen"

interface Routes {
    'create-tasks': keyof FileRoutesByFullPath;
    registery: keyof FileRoutesByFullPath;
    login: keyof FileRoutesByFullPath;
    profile: keyof FileRoutesByFullPath;  
}

export const routes: Routes = {
    'create-tasks': '/create-tasks',
    registery: '/registery',
    login: '/login',
    profile: '/profile',
}