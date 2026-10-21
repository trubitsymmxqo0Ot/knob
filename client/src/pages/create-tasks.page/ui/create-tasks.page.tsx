import { sizes } from "shared/styles/sizes"
import { TaskSetup } from "widgets/task-setup"

export const CreateTasksPage = () => {
    return (
        <section className={sizes["screen-light"]}>
            <TaskSetup/>
        </section>
    )
}