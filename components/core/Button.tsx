interface ButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  fullscreen: boolean;
}

const Button = ({ children, className, onClick, fullscreen }: ButtonProps) => {
  return (
    <button
      className={`py-4 px-8 text-white font-bold font-roboto uppercase w-300 ease-in-out duration-200 ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
