import { routes } from "shared/model/routes"
import { Link } from "@tanstack/react-router"
import { useState } from "react"
import { Loading } from "shared/ui/icons"
import { type SelectRole, useSignUp } from "entities/sign-up"
import { ShowPassword } from "shared/ui/show-password/show-password"
import { Form } from "@heroui/form";
import { Input } from "@heroui/input";
import { Button } from "@heroui/button";
import { Select, SelectItem } from "@heroui/select";
import { selectData } from "../model/select-data"
import { addToast } from "@heroui/toast"

export const SignUp = () => {
    const mutation = useSignUp();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showRepeatPassword, setShowRepeatPassword] = useState(false);
    const [select, setSelect] = useState<SelectRole>('frontend');
    const handleSignUp = () => {
        if (password === repeatPassword) {
            mutation.mutate({
                user: { email, name, password, role: select },
            });
        } else {
            addToast({ title: 'Пароли не совпадают', color: 'danger' });
        }
    };

    return (
        <section className="w-full h-screen flex justify-center items-center flex-col">
            <div className="bg-black/60 max-w-120 w-full px-10 py-7 flex flex-col gap-6">
                <h2 className="text-center text-[18px] leading-normal font-bold">Регистрация</h2>
                <Form className="flex flex-col gap-5">
                    <div className="flex flex-col gap-2 w-full">
                        <div>
                            <label className='text-[12px] ml-1 mb-0.5' htmlFor="login-email">Введите email</label>
                            <Input
                                id='login-email'
                                tabIndex={1}
                                variant="faded"
                                classNames={{
                                    inputWrapper: 'bg-gray-500/30 text-white rounded-none border-gray-500/60 border',
                                }}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div>
                            <label className='text-[12px] ml-1 mb-0.5' htmlFor="login-username">Введите имя пользователя</label>
                            <Input
                                id='login-username'
                                tabIndex={2}
                                variant="faded"
                                classNames={{
                                    inputWrapper: 'bg-gray-500/30 text-white rounded-none border-gray-500/60 border',
                                }}
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div>
                            <label className='text-[12px] ml-1 mb-0.5' htmlFor="login-password">Ваш пароль</label>
                            <div className="relative">
                                <Input
                                    tabIndex={3}
                                    id="login-password"
                                    variant="faded"
                                    classNames={{
                                        inputWrapper: 'bg-gray-500/30 text-white rounded-none border-gray-500/60 border',
                                    }}
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <ShowPassword
                                    tabIndex={4}
                                    showPassword={showPassword}
                                    setShowPassword={setShowPassword}
                                    className="absolute top-1/2 right-2 -translate-y-1/2"
                                />
                            </div>
                        </div>
                        <div>
                            <label className='text-[12px] ml-1 mb-0.5' htmlFor="repeat-password">Повторите пароль</label>
                            <div className="relative">
                                <Input
                                    tabIndex={5}
                                    variant="faded"
                                    classNames={{
                                        inputWrapper: 'bg-gray-500/30 text-white rounded-none border-gray-500/60 border',
                                    }}
                                    type={showRepeatPassword ? 'text' : 'password'}
                                    value={repeatPassword}
                                    id='repeat-password'
                                    onChange={(e) => setRepeatPassword(e.target.value)}
                                />
                                <ShowPassword
                                    tabIndex={6}
                                    showPassword={showRepeatPassword}
                                    setShowPassword={setShowRepeatPassword}
                                    className="absolute top-1/2 right-2 -translate-y-1/2"
                                />
                            </div>
                        </div>
                        <div>
                            <label className='text-[12px] ml-1 mb-0.5' htmlFor="select-role">Выберите вашу роль</label>
                            <Select
                                tabIndex={7}
                                id='select-role'
                                value={select}
                                aria-label={'Роль пользователя'}
                                placeholder="Ваша роль"
                                defaultSelectedKeys={[select]}
                                onSelectionChange={(e) => {
                                    const [value] = e;
                                    if (typeof value === 'string') {
                                        setSelect(value as SelectRole);
                                    }
                                }}
                                variant="faded"
                                classNames={{
                                    trigger: 'bg-gray-500/30 text-white rounded-none border-gray-500/60 border',
                                    value: 'text-white!',
                                    popoverContent: 'bg-[#27292e] text-white',
                                }}
                            >
                                {selectData.map((select) => (
                                    <SelectItem key={select.key} className="data-[hover=true]:bg-gray-500/60! data-[hover=true]:text-white! hover:bg-gray-500/60! hover:text-white!">{select.label}</SelectItem>
                                ))}
                            </Select>
                        </div>
                    </div>
                    <Button
                        tabIndex={8}
                        type="button"
                        variant="solid"
                        isLoading={mutation.isPending}
                        className='rounded-none text-center block max-w-45 w-full mx-auto'
                        onPress={handleSignUp}
                        isIconOnly={mutation.isPending}
                        isDisabled={mutation.isPending}
                    >
                        {mutation.isPending ?
                            (
                                <div className="flex items-center justify-center w-full h-full">
                                    <Loading
                                        size={16}
                                        className="text-white flex items-center justify-center animate-spin"
                                    />
                                </div>
                            )
                            : 'Зарегистрироваться'
                        }
                    </Button>
                </Form>
                    <Link
                        to={routes.login}
                        className="text-center text-[13px] w-full"
                        tabIndex={9}
                    >
                        Уже есть аккаунт?
                        <span className="text-blue-500 font-semibold px-1.5">
                            Войти
                        </span>
                    </Link>
            </div>
        </section>
    )

}