import { Select, SelectItem } from "@firecms/cloud";

export const CasePicker = <T extends readonly string[]>({ options, placeholder, onValueChange, value }: {
    options: T;
    placeholder?: React.ReactNode;
    value?: T[number];
    onValueChange: (newValue: T[number] | undefined) => void;
}) => {
    return (
        <Select
            value={value}
            onValueChange={onValueChange}
            placeholder={placeholder}
            renderValue={(value) => {
                return value;
            }}
        >
            {options.map(option => <SelectItem value={option}>{option}</SelectItem>)}
        </Select>
    );
};