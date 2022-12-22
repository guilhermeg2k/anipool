import { HTMLAttributes } from 'react';

const IconButton = ({
  children,
  ...rest
}: HTMLAttributes<HTMLButtonElement>) => {
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
