import React from 'react';
import Label from './Label';

interface FormGroupProps {
  id: string;
  label: string;
  children: React.ReactNode;
}

const FormGroup = ({ id, label, children }: FormGroupProps) => {
  return (
    <div id={id} className="w-full">
      <Label htmlFor={id}>{label}</Label>
      <div className="flex w-full flex-col gap-2">{children}</div>
    </div>
  );
};

export default FormGroup;
