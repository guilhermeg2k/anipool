import React from 'react';
import InputLabel from './InputLabel';

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
  label = '',
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
      <InputLabel htmlFor={id} label={label} />
      <input
        id={id}
        value={value}
        type="text"
        className={`outline-none  p-2 border text-neutral-700 border-neutral-300 focus:border-indigo-600 hover:border-indigo-900 ${
          fullWidth && 'w-full'
        }`}
        onChange={onChangeHandler}
      />
    </div>
  );
};

export default TextInput;
