interface ButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const Button = ({ children, className, onClick }: ButtonProps) => {
  return (
    <button
      className={`py-4 px-8 text-white font-bold font-roboto uppercase ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
