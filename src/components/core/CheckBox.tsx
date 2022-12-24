import { InputHTMLAttributes } from 'react';

interface CheckBoxProps extends InputHTMLAttributes<HTMLInputElement> {
  id?: string;
  checked?: boolean;
  children: React.ReactNode;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const CheckBox = ({ id, checked, children, ...rest }: CheckBoxProps) => {
  return (
    <div className="flex items-center gap-1">
      <input
        type="checkbox"
        checked={checked}
        id={id}
        className="h-5 w-5 rounded-sm border border-neutral-300 text-indigo-900 
                  hover:border-indigo-900 focus:border-indigo-600 focus:ring-indigo-300"
        {...rest}
      />
      <label className="font-medium " htmlFor={id}>
        {children}
      </label>
    </div>
  );
};

export default CheckBox;
