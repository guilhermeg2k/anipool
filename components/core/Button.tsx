interface ButtonProps {
  children: React.ReactNode;
  size?: string;
  className?: string;
  color?: string;
  disabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const Button = ({
  children,
  className,
  size = 'normal',
  color = 'indigo',
  disabled = false,
  onClick,
}: ButtonProps) => {
  const buildColorClasses = () => {
    if (disabled) {
      return 'bg-neutral-300 text-neutral-400';
    }

    switch (color) {
      case 'indigo':
        return 'bg-indigo-900 hover:bg-indigo-800 active:bg-indigo-900';
      case 'green':
        return 'bg-green-500 hover:bg-green-400 active:bg-green-500';
      default:
        return '';
    }
  };

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
      className={`${className} ${buildSizeClasses()} ${buildColorClasses()} min-w-[100px] font-roboto font-bold uppercase text-white duration-200 ease-in-out`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
