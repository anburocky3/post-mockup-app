import { ChangeEvent } from "react";

interface FormTextAreaProps {
  name: string;
  label: string;
  placeholder: string;
  value: string;
  onChange: (value: ChangeEvent<HTMLTextAreaElement>) => void;
}

const FormTextArea = ({
  label,
  name,
  placeholder,
  value,
  onChange,
}: FormTextAreaProps) => {
  return (
    <>
      <label htmlFor={name} className="block mb-1 text-gray-400">
        {label}
      </label>
      <textarea
        id={name}
        name={name}
        className="bg-gray-200 px-4 py-2 rounded w-full outline-none"
        placeholder={placeholder}
        onChange={(e) => onChange(e)}
        defaultValue={value}
      ></textarea>
    </>
  );
};
export default FormTextArea;
