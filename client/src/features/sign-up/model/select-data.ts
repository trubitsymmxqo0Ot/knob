import type { SelectRole } from "entities/sign-up";

interface SelectData {
    key: SelectRole;
    label: Capitalize<SelectRole>;
}

export const selectData: SelectData[] = [
    { key: 'backend', label: 'Backend' },
    { key: 'frontend', label: 'Frontend' },
    { key: 'fullstack', label: 'Fullstack' },
    { key: 'designer', label: 'Designer' },
    { key: 'devops', label: 'Devops' },
    { key: 'other', label: 'Other' },
]
