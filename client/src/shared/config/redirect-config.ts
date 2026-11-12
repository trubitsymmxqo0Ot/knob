import { Navigate } from "@tanstack/react-router"

class RedirectConfig {

    login({replace}: {replace?: boolean}) {
        void Navigate({to: '/login', replace: replace ?? false});
    }

    profile({replace}: {replace?: boolean}) {
        void Navigate({to: '/profile', replace: replace ?? false});
    }

    custom(path: string, {replace}: {replace?: boolean}) {
        void Navigate({to: path, replace: replace ?? false});
    }
}

export const redirectConfig = new RedirectConfig();