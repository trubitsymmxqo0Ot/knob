import { Button } from "@heroui/react/button"
import { Link } from "@tanstack/react-router"
import { routes } from "shared/model/routes"

export const NotFoundPage = () => {
    return (
        <section className="w-full h-screen flex flex-col justify-center gap-12 items-center">
            <h2 className="flex flex-col text-center items-center text-[32px]">
                <span className="text-[104px] text-bold mb-1 leading-none">404</span>
                Страница не найдена
            </h2>
            <Button className='rounded-none'>
                <Link
                    to={routes["create-tasks"]}
                    className="text-[16px]"
                >
                    На главную
                </Link>
            </Button>
        </section>
    )
}