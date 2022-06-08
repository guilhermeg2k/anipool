interface InputLabelProps {
  label: string;
  htmlFor?: string;
}

const InputLabel = ({ label, htmlFor }: InputLabelProps) => {
  return (
    <label
      htmlFor={htmlFor}
      className="text-neutral-700 block text-sm uppercase font-medium"
    >
      {label}
    </label>
  );
};

export default InputLabel;
