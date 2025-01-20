import { Control, Controller } from "react-hook-form";
import Select, { MultiValue, SingleValue } from "react-select";

interface Option {
    label: string;
    value: string | number;
}

interface FormInputDataListProps {
    control: Control;
    registerName: string;
    data: Option[];
    placeholder?: string;
    isLoading?: boolean;
    isMulti?: boolean;
    isDisabled?: boolean;
    required?: boolean;
}

function FormInputDataList({
    control,
    registerName,
    data,
    placeholder,
    isLoading,
    isMulti,
    isDisabled,
    required,
}: FormInputDataListProps) {
    return (
        <Controller
            name={registerName}
            control={control}
            rules={{
                required: required ? "This field is required" : false,
            }}
            defaultValue=""
            render={({ field }) => (
                <Select<Option, boolean>
                    {...field}
                    options={data}
                    isMulti={isMulti}
                    placeholder={placeholder}
                    isDisabled={isLoading || isDisabled}
                    // styles={REACT_SELECT_STYLES}
                    required={required}
                    onChange={(newValue: MultiValue<Option> | SingleValue<Option>) => {
                        field.onChange(isMulti ? newValue : (newValue as SingleValue<Option>));
                    }}
                />
            )}
        />
    );
}

export default FormInputDataList;