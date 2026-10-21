import { createFileRoute } from "@tanstack/react-router";
import { CreateTasksPage } from "pages/create-tasks.page";

export const Route = createFileRoute('/create-tasks')({
    component: CreateTasks
})

function CreateTasks() {
    return <CreateTasksPage/>
}