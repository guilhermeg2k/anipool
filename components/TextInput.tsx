import React from 'react';

interface TextInputProps {
  value: string;
  id: string;
  label?: string;
  fullWidth?: boolean;
  maxLength?: number;
  onChange: (value: string) => void;
}

const TextInput = ({
  id,
  value,
  label,
  fullWidth = false,
  maxLength,
  onChange,
}: TextInputProps) => {
  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    if (!maxLength || newValue.length < maxLength) {
      onChange(newValue);
    }
  };
  return (
    <div>
      <label
        htmlFor={id}
        className="text-neutral-700 block text-sm uppercase font-medium"
      >
        {label}
      </label>
      <input
        id={id}
        value={value}
        type="text"
        className={`border border-neutral-300 outline-none text-neutral-700 p-2 focus:border-indigo-700 ${
          fullWidth && 'w-full'
        }`}
        onChange={onChangeHandler}
      />
    </div>
  );
};

export default TextInput;
