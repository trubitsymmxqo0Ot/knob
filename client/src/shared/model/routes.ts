import type { FileRoutesByFullPath } from "src/routeTree.gen"


export const routes: Record<string, keyof FileRoutesByFullPath> = {
    'create-tasks': '/create-tasks',
    registery: '/registery',
}