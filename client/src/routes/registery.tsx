import { createFileRoute, redirect } from "@tanstack/react-router";
import { SignUpPage } from "pages/sign-up.page";

export const Route = createFileRoute('/registery')({
    component: Registery,
    beforeLoad: ({context}) => {
        if(context.auth) {
            throw redirect({to: '/profile'});
        }
    }
})

function Registery() {
    return <SignUpPage/>
}