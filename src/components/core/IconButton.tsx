import { HTMLAttributes, ReactNode } from 'react';

interface IconButtonProps extends HTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

const IconButton = ({ children, ...rest }: IconButtonProps) => {
  return (
    <button
      className="rounded-full border-2 p-2 border-transparent hover:bg-slate-200"
      {...rest}
    >
      <div className="w-5 h-5">{children}</div>
    </button>
  );
};

export default IconButton;
