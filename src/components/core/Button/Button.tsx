import { ButtonHTMLAttributes, ReactNode } from 'react';
import Tooltip from '../Tooltip';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  size?: string;
  color?: 'indigo' | 'green' | 'white' | 'gray';
  title?: string;
}

const Button: React.FC<ButtonProps> = ({
  className = '',
  size = 'normal',
  color = 'indigo',
  title,
  disabled,
  children,
  ...rest
}) => {
  const buildColorClasses = () => {
    if (disabled) {
      return 'bg-neutral-300 text-neutral-400';
    }

    switch (color) {
      case 'indigo':
        return 'bg-indigo-900 hover:bg-indigo-800 active:bg-indigo-900';
      case 'green':
        return 'bg-green-500 hover:bg-green-400 active:bg-green-500';
      case 'white':
        return 'bg-white hover:bg-neutral-100 active:bg-neutral-200 text-neutral-800';
      case 'gray':
        return 'bg-neutral-300 hover:bg-neutral-400 active:bg-neutral-300';
      default:
        return '';
    }
  };

  const buildSizeClasses = () => {
    switch (size) {
      case 'small':
        return 'py-1 px-2';
      case 'normal':
        return 'px-2 py-2 sm:px-4';
      case 'large':
        return 'py-4 px-8';
      default:
        return '';
    }
  };

  return (
    <Tooltip title={title}>
      <button
        className={`${buildSizeClasses()} ${buildColorClasses()} min-w-[100px] rounded-sm font-roboto font-bold uppercase text-white duration-200 ease-in-out ${className}`}
        disabled={disabled}
        {...rest}
      >
        <div className="flex items-center justify-center gap-1">{children}</div>
      </button>
    </Tooltip>
  );
};

export default Button;
