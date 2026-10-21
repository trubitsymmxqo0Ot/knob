import { Link } from "@tanstack/react-router"
import { routes } from "shared/model/routes"

export const Navbar = () => {
    return (
        <header className="bg-black w-full min-h-15 max-h-20 flex justify-center items-center gap-8">
                <Link to={routes['create-tasks']} className='text-white hover:text-sky-300 transition-colors py-1 px-2'>Создать задачу</Link>
        </header>
    )
}