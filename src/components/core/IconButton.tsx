import { ButtonHTMLAttributes } from 'react';
import Tooltip from './Tooltip';

const IconButton = ({
  children,
  title,
  disabled,
  ...rest
}: ButtonHTMLAttributes<HTMLButtonElement>) => {
  const className = disabled
    ? 'rounded-full border-2 border-transparent p-2 text-gray-400'
    : 'rounded-full border-2 border-transparent p-2 hover:bg-gray-200';

  return (
    <Tooltip title={title}>
      <button className={className} disabled={disabled} {...rest}>
        <div className="h-5 w-5">{children}</div>
      </button>
    </Tooltip>
  );
};

export default IconButton;
