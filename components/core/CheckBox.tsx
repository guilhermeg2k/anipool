interface CheckBoxProps {
  id?: string;
  value: boolean;
  children: React.ReactNode;
  onChange: (value: boolean) => void;
}

const CheckBox = ({ id, value, children, onChange }: CheckBoxProps) => {
  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.checked);
  };

  return (
    <div className="flex items-center gap-1">
      <input
        type="checkbox"
        checked={value}
        id={id}
        className="h-5 w-5 rounded-sm border border-neutral-300 text-indigo-900 
                  hover:border-indigo-900 focus:border-indigo-600 focus:ring-indigo-300"
        onChange={onChangeHandler}
      />
      <label className="font-medium " htmlFor={id}>
        {children}
      </label>
    </div>
  );
};

export default CheckBox;
