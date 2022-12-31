interface SpinnerProps {
  className?: string;
}

const Spinner: React.FC<SpinnerProps> = ({
  className = 'border-indigo-900',
}) => {
  return (
    <div
      className={`${className} h-8 w-8 animate-spin rounded-full border-t-4 `}
    />
  );
};

export default Spinner;
