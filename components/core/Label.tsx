interface LabelProps {
  label: string;
  htmlFor?: string;
}

const Label = ({ label, htmlFor }: LabelProps) => {
  return (
    <label htmlFor={htmlFor} className="block text-sm font-medium uppercase ">
      {label}
    </label>
  );
};

export default Label;
