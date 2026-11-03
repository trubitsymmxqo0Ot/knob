const appUrl = (import.meta.env.VITE_APP_URL ?? 'http://localhost').replace(/^['"]|['"]$/g, '')
const backendPort = import.meta.env.VITE_BACKEND_PORT ?? import.meta.env.VITE_BACKEND_URL ?? '4000'

export const BASE_KEY = `${appUrl}:${backendPort}`
