import { ListBoxItem } from "@heroui/react/list-box-item"
import { configureData } from "../model/configure-data"
import { SelectExecutorTask } from "./components/select-executor-task"
import { SelectTypeTask } from "./components/select-type-task"
import { mockData } from "../model/mock-data"
import { TextArea } from "@heroui/react/textarea"
import { Button } from "@heroui/react/button"

export const TaskSetup = () => {

    return (
        <>
            <h2 className='text-[32px] px-4 mb-5'>Создать задачу</h2>
            <form className="bg-black/30 p-5 flex flex-col gap-5">
                <SelectExecutorTask name='complexity-task' placeholder="Выберите команду">
                    {mockData.teams.map(({ id, line, title }) => (
                        <ListBoxItem
                            key={id}
                            className='hover:bg-black/30 transition-colors py-4 rounded-none data-[selected=true]:bg-indigo-950'
                            value={title}

                        >
                            <div className="flex flex-col gap-3">
                                <span className="text-[16px] font-semibold leading-1">{title}</span>
                                <span className="italic text-[11px] leading-1">{line}</span>
                            </div>
                        </ListBoxItem>
                    ))}
                </SelectExecutorTask>
                <SelectTypeTask name="complexity-task" configureData={configureData["complexity-task"]} title="Сложность задачи" defaultValue="Выберите сложность" />
                <SelectTypeTask name="priority-task" configureData={configureData.priority} title="Приоритет задачи" defaultValue="Выберите приоритет" />
                <SelectExecutorTask name='select-executor' placeholder="Выберите исполнителя">
                    {mockData.users.map(({ id, email, name, skill }) => (
                        <ListBoxItem
                            key={id}
                            className='hover:bg-black/30 transition-colors py-4 rounded-none data-[selected=true]:bg-indigo-950'
                            value={name}

                        >
                            <div className="flex flex-col gap-4">
                                <div className="flex flex-col gap-1.5">
                                    <span className="text-[16px] font-semibold leading-1">{name}</span>
                                    <a href={`mailto:${email}`} className="text-blue-400 underline">{email}</a>
                                </div>
                                <span className="italic text-[11px] leading-1">{skill}</span>
                            </div>
                        </ListBoxItem>
                    ))}
                </SelectExecutorTask>
                <TextArea
                    aria-label="issue-description"
                    className='w-full bg-white/10 rounded-none text-white min-h-30 max-h-85'
                    placeholder="Описание задачи"
                />
                <SelectExecutorTask name="select-author" multiply={false} placeholder="Назначить автором другим">
                    {mockData.users.map(({email, id, name, skill}) => (
                            <ListBoxItem
                            key={id}
                            className='hover:bg-black/30 transition-colors py-4 rounded-none data-[selected=true]:bg-indigo-950'
                            value={name}

                        >
                            <div className="flex flex-col gap-4">
                                <div className="flex flex-col gap-1.5">
                                    <span className="text-[16px] font-semibold leading-1">{name}</span>
                                    <a href={`mailto:${email}`} className="text-blue-400 underline">{email}</a>
                                </div>
                                <span className="italic text-[11px] leading-1">{skill}</span>
                            </div>
                        </ListBoxItem>
                    ))}
                </SelectExecutorTask>
                <div className="flex gap-6">
                <Button variant="secondary" className='rounded-none'>Создать</Button>
                <Button variant="outline" className='rounded-none text-white'>Отмена</Button>
                </div>
            </form>
        </>
    )
}