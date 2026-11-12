import { Link } from "@tanstack/react-router"
import { routes } from "shared/model/routes"
import { useState } from "react"
import { Form } from "@heroui/form";
import { Input } from "@heroui/input";
import { Button } from "@heroui/button";
import { ShowPassword } from "shared/ui/show-password/show-password"
import { useSignIn } from "entities/sign-in";

export const SignIn = () => {
    const mutation = useSignIn();
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const handleSignIn = () => {
        mutation.mutate({
            user: { email, password },
        })
    }
    return (
        <section className="flex justify-center items-center flex-col h-screen">
            <div className="bg-black/60 max-w-120 px-10 py-7 flex flex-col gap-6">
                <h1
                    className="text-[18px] leading-[100%] text-center font-bold"
                >
                    Чтобы посмотреть задачи нужно войти в профиль
                </h1>
                <Form className="flex flex-col gap-11">
                    <div className="flex flex-col gap-4 w-full">
                        <div className="w-full">
                            <label htmlFor='registery-email' className="text-[12px] ml-1 mb-0.5">Email</label>
                            <Input
                                tabIndex={1}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                id='registery-email'
                                variant="faded"
                                classNames={{
                                    inputWrapper: 'bg-gray-500/30 text-white rounded-none border-gray-500/60 border',
                                }}
                            />
                        </div>
                        <div>
                            <label htmlFor='registery-password' className="text-[12px] ml-1 mb-0.5">Пароль</label>
                            <div className="relative">
                                <Input
                                    tabIndex={2}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    id='registery-password'
                                    variant="faded"
                                    classNames={{
                                        inputWrapper: 'bg-gray-500/30 text-white rounded-none border-gray-500/60 border',
                                    }}
                                    type={showPassword ? 'text' : 'password'}
                                />
                                <ShowPassword
                                    showPassword={showPassword}
                                    setShowPassword={setShowPassword}
                                    className="absolute top-1/2 right-3 -translate-y-1/2"
                                    tabIndex={3}
                                />
                            </div>
                        </div>
                    </div>
                    <Button
                        className='block w-full max-w-30 mx-auto rounded-none'
                        tabIndex={4}
                        onPress={handleSignIn}
                    >
                        Войти
                    </Button>
                </Form>
                    <Link
                        to={routes.registery}
                        className="text-center text-[13px] w-full"
                        tabIndex={5}
                    >
                        Ещё нет аккаунта?
                        <span className="text-blue-500 font-semibold px-1.5">
                            Зарегистрироваться
                        </span>
                    </Link>
            </div>
        </section>
    )
}