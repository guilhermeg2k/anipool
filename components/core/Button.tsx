interface ButtonProps {
  children: React.ReactNode;
  disabled?: boolean;
  size?: string;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const Button = ({
  children,
  className,
  disabled = false,
  size = 'normal',
  onClick,
}: ButtonProps) => {
  const buildSizeClasses = () => {
    switch (size) {
      case 'small':
        return 'py-1 px-2';
      case 'normal':
        return 'py-2 px-4';
      case 'large':
        return ' py-4 px-8';
      default:
        return 'py-2 px-4';
    }
  };
  return (
    <button
      className={`${className} ${buildSizeClasses()} min-w-[100px] font-roboto font-bold uppercase text-white duration-200 ease-in-out`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
