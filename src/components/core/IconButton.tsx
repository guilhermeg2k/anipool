import { HTMLAttributes } from 'react';
import Tooltip from './Tooltip';

const IconButton = ({
  children,
  title,
  ...rest
}: HTMLAttributes<HTMLButtonElement>) => {
  return (
    <Tooltip title={title}>
      <button
        className="rounded-full border-2 border-transparent p-2 hover:bg-slate-200"
        {...rest}
      >
        <div className="h-5 w-5">{children}</div>
      </button>
    </Tooltip>
  );
};

export default IconButton;
