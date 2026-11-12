import { Link } from "@tanstack/react-router"
import { routes } from "shared/model/routes"

export const Navbar = () => {
    const defaultLink = 'text-white hover:text-sky-300 transition-colors py-1 px-2';

    return (
        <header className="bg-black w-full min-h-15 max-h-20 flex justify-center items-center gap-8">
                <Link to={routes['create-tasks']} className={defaultLink}>Создать задачу</Link> |
                <Link to={routes['profile']} className={defaultLink}>Профиль</Link>
        </header>
    )
}