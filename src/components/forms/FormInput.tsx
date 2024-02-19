import { ChangeEvent } from "react";

interface FormInputProps {
  name: string;
  label: string;
  placeholder: string;
  value: string;
  onChange: (value: ChangeEvent<HTMLInputElement>) => void;
}

const FormInput = ({
  label,
  name,
  placeholder,
  value,
  onChange,
}: FormInputProps) => {
  return (
    <>
      <label
        htmlFor={name}
        className="block mb-1 text-gray-400 dark:text-white"
      >
        {label}
      </label>
      <input
        id={name}
        name={name}
        type="text"
        className="bg-gray-200 px-4 py-2 rounded w-full outline-none "
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e)}
        autoFocus
      />
    </>
  );
};
export default FormInput;
