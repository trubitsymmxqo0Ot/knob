import { Link } from "@heroui/react/link"
import { mockRoutes } from "../model/mock-routes"

export const Navbar = () => {
    return (
        <header className="bg-black w-full min-h-15 max-h-20 flex justify-center items-center gap-8">
            {mockRoutes.map(route => (
                <Link href={route.href} className='text-white hover:text-sky-300 transition-colors py-1 px-2'>{route.title}</Link>
            ))}
        </header>
    )
}