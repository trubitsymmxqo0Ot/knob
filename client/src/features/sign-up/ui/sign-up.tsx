import { Input } from "@heroui/react/input"
import { Form } from "@heroui/react/form"
import { Button } from "@heroui/react/button"
import { routes } from "shared/model/routes"
import { Link } from "@tanstack/react-router"

export const SignUp = () => {
    return (
        <section className="w-full h-screen flex justify-center items-center flex-col">
            <div className="bg-black/60 max-w-120 w-full px-10 py-7">
                <h2 className="mb-8 text-center text-[18px] leading-normal font-bold">Регистрация</h2>
                <Form className="flex flex-col gap-11 w-full">
                    <div className="flex flex-col gap-4">
                        <div className="w-full">
                            <label className='text-[12px] ml-1 mb-0.5' htmlFor="login-email">Введите email</label>
                            <Input id='login-email' className='bg-gray-500/30 block w-full rounded-none text-white' />
                        </div>
                        <div className="w-full">
                            <label className='text-[12px] ml-1 mb-0.5' htmlFor="login-username">Введите имя пользователя</label>
                            <Input id='login-username' className='block bg-gray-500/30 w-full rounded-none text-white'/>
                        </div>
                        <div className="w-full">
                            <label className='text-[12px] ml-1 mb-0.5' htmlFor="login-password">Ваш пароль</label>
                            <Input id="login-password" className='block bg-gray-500/30 w-full rounded-none text-white'/>
                        </div>
                    </div>
                    <Button className='rounded-none text-center block max-w-45 w-full mx-auto'>Зарегистрироваться</Button>
                    <Link to={routes.login} className="text-center text-[13px]">Уже есть аккаунт? <span className="text-blue-500 font-semibold px-1.5">Войти</span></Link>
                </Form>
            </div>
        </section>
    )

}