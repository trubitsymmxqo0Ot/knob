import { ListBox } from "@heroui/react/list-box"
import { SelectTrigger, Select, SelectValue, SelectPopover } from "@heroui/react/select"
import type { ReactNode } from "react"

interface SelectExecutorTaskProps {
    children: ReactNode;
    placeholder?: string;
    name: string;
    multiply?: boolean
    isRequired?: boolean;
}

/*
    TODO: возможно, позже будет разделение, т.к. юзеры должны подтягиваться только из выбранных команд
*/

export const SelectExecutorTask = ({ children, name, placeholder = 'Выберите тип', multiply = true, isRequired = true }: SelectExecutorTaskProps) => {

    return (
        <Select isRequired={isRequired} name={name} placeholder={placeholder} selectionMode={multiply ? 'multiple' : 'single'}>
            <SelectTrigger className='bg-white/10 rounded-none'>
                <SelectValue className='text-white py-2'>
                    {({ selectedItems, isPlaceholder }) => (
                        isPlaceholder ? (
                            <span className="text-white/50">{placeholder || 'Выберите тип'}</span>
                        ) : (
                            <div className="flex gap-x-3">
                                {selectedItems.map(select => {
                                    const value = String(select);
                                    return (
                                        <span key={value}>{value}</span>
                                    )
                                })}
                            </div>
                        )
                    )}
                </SelectValue>
            </SelectTrigger>
            <SelectPopover className='rounded-none bg-gray-900 text-white'>
                <ListBox className="py-2 rounded-none gap-1 flex flex-col" selectionMode="multiple">
                    {children}
                </ListBox>
            </SelectPopover>
        </Select>
    )
}
