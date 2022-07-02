interface ButtonProps {
  children: React.ReactNode;
  size?: string;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const Button = ({
  children,
  className,
  size = 'normal',
  onClick,
}: ButtonProps) => {
  const buildSizeClasses = () => {
    switch (size) {
      case 'small':
        return 'w-250 py-1 px-2';
      case 'normal':
        return 'w-300 py-2 px-4';
      case 'large':
        return 'w-300 py-4 px-8';
      case 'normal':
        return 'w-270 py-2 px-4';
    }
  };
  return (
    <button
      className={`${className} ${buildSizeClasses()} font-roboto font-bold uppercase text-white duration-200 ease-in-out`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
