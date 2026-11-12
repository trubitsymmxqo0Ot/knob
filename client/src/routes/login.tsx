import { createFileRoute, redirect } from '@tanstack/react-router'
import { SignInPage } from 'pages/sign-in.page'

export const Route = createFileRoute('/login')({
  component: Login,
  beforeLoad: ({context}) => {
    if(context.auth) {
        throw redirect({to: '/profile'});
    }
}
})

function Login() {
  return <SignInPage/>
}
