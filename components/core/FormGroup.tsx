import React from 'react';
import Label from './Label';

interface FormGroupProps {
  id?: string;
  label: string;
  className?: string;
  children: React.ReactNode;
}

const FormGroup = ({ id, label, className = '', children }: FormGroupProps) => {
  return (
    <div id={id} className="w-full">
      <Label htmlFor={id}>{label}</Label>
      <div className={`flex w-full gap-2 ${className}`}>{children}</div>
    </div>
  );
};

export default FormGroup;
