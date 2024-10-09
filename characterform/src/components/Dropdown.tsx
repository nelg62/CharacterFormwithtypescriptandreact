import { ChangeEvent } from "react";

type Option<T> = {
  value: T;
  label: string;
};

type DropdownProps<T> = {
  options: Option<T>[];
  selectedOption: T;
  onChange: (selected: T) => void;
  label?: string;
};

export const Dropdown = <T extends string | number>({
  options,
  selectedOption,
  onChange,
}: // label,
DropdownProps<T>) => {
  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    onChange(event.target.value as T);
  };

  return (
    <div>
      {/* {label && <label htmlFor="dropdown">{label}</label>} */}
      <select id="dropdown" value={selectedOption} onChange={handleChange}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {/* <p>You selected: {selectedOption}</p> */}
    </div>
  );
};
