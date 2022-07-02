import React from 'react';
import Label from './Label';

interface TextFieldProps {
  value: string;
  id: string;
  label?: string;
  fullWidth?: boolean;
  maxLength?: number;
  onChange: (value: string) => void;
}

const TextField = ({
  id,
  value,
  label = '',
  fullWidth = false,
  maxLength,
  onChange,
}: TextFieldProps) => {
  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    if (!maxLength || newValue.length < maxLength) {
      onChange(newValue);
    }
  };
  return (
    <div>
      <Label htmlFor={id} label={label} />
      <input
        id={id}
        value={value}
        type="text"
        className={`border border-neutral-300 p-2  outline-none hover:border-indigo-900 focus:border-indigo-600 focus:ring-0 ${
          fullWidth && 'w-full'
        }`}
        onChange={onChangeHandler}
      />
    </div>
  );
};

export default TextField;
