interface LabelProps {
  label: string;
  htmlFor?: string;
}

const Label = ({ label, htmlFor }: LabelProps) => {
  return (
    <label
      htmlFor={htmlFor}
      className="text-neutral-600 block text-sm uppercase font-medium"
    >
      {label}
    </label>
  );
};

export default Label;
