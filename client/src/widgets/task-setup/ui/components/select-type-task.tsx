import { ListBoxItem } from "@heroui/react/list-box-item";
import { ListBox } from "@heroui/react/list-box";
import { SelectTrigger, Select, SelectValue, SelectPopover } from "@heroui/react/select";
import clsx from "clsx";
import { ConfigurationRow } from "./configuration-row";

interface SelectTypeTaskProps {
    className?: string;
    title: string;
    defaultValue: string;
    name: string;
    configureData: {
        name: string;
        value: string;
        style?: string;
    }[]
}

export const SelectTypeTask = ({ title, className, configureData, defaultValue, name }: SelectTypeTaskProps) => {
    return (
        <ConfigurationRow className={className} title={title}>
            <Select isRequired name={name} placeholder={defaultValue}>
                <SelectTrigger className='bg-white/10 items-center rounded-none'>
                    <SelectValue className='leading-none text-white flex items-center gap-2' />
                </SelectTrigger>
                <SelectPopover className='rounded-none bg-gray-900 text-white'>
                    <ListBox className="p-0 rounded-none">
                        {configureData.map(({ name, style, value }) => (
                            <ListBoxItem
                                key={name}
                                className='hover:bg-black/30 transition-colors rounded-none' value={value}
                            >
                                <div className={clsx("w-3 h-3 rounded-full", style)} />
                                {name}
                            </ListBoxItem>
                        ))}
                    </ListBox>
                </SelectPopover>
            </Select>
        </ConfigurationRow>
    )
}