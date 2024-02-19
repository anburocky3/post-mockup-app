interface FormCheckboxProps {
  name: string;
  label: string;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const FormCheckbox = ({
  label,
  name,
  checked,
  onChange,
}: FormCheckboxProps) => {
  return (
    <div className="flex items-center">
      <label htmlFor={name} className="text-gray-400 dark:text-white">
        {label}
      </label>
      <input
        type="checkbox"
        id={name}
        name={name}
        checked={checked}
        onChange={onChange}
        className="ml-2 w-4 h-4 rounded"
      />
    </div>
  );
};

export default FormCheckbox;
