import { createFileRoute } from "@tanstack/react-router";
import { CreateTasksPage } from "pages/create-tasks.page";

export const Route = createFileRoute('/_protected/create-tasks')({
    component: CreateTasks
})

function CreateTasks() {
    return <CreateTasksPage/>
}