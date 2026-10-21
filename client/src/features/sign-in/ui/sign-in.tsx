import { Input } from "@heroui/react/input"
import { Form } from "@heroui/react/form"
import { Button } from "@heroui/react/button"
import { Link } from "@tanstack/react-router"
import { routes } from "shared/model/routes"

export const SignIn = () => {
    return (
        <section className="flex justify-center items-center flex-col h-screen">
            <div className="bg-black/60 max-w-120 px-10 py-7">
                <h1
                    className="mb-8 text-[18px] leading-[100%] text-center font-bold"
                >
                    Чтобы посмотреть задачи нужно войти в профиль
                </h1>
                <Form className="flex flex-col gap-11">
                    <div className="flex flex-col gap-4">
                    <div className="w-full">
                        <label className="text-[12px] ml-1 mb-0.5">Email или логин</label>
                        <Input className='bg-gray-500/30 block w-full rounded-none text-white' />
                    </div>
                    <div>
                        <label className="text-[12px] ml-1 mb-0.5">Пароль</label>
                        <Input className='bg-gray-500/30 block w-full rounded-none text-white' />
                    </div>
                    </div>
                    <Button className='block w-full max-w-30 mx-auto rounded-none'>Войти</Button>
                    <Link to={routes.registery} className="text-center text-[13px]">Ещё нет аккаунта? <span className="text-blue-500 font-semibold px-1.5">Зарегистрироваться</span></Link>
                </Form>
            </div>
        </section>
    )
}