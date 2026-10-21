import { CreateTasks } from "pages/create-tasks"
import { Providers } from "./providers"

export const App = () => {
  return (
    <Providers>
      <CreateTasks/>
    </Providers>
  )
}