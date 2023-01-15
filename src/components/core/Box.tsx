import { ReactNode } from 'react';
import Title from './Title';

interface BoxProps {
  children?: React.ReactNode;
  title?: string;
  description?: ReactNode | ReactNode[];
  actions?: ReactNode | ReactNode[];
  className?: string;
}

const Box = ({
  children,
  title,
  description,
  actions,
  className = '',
}: BoxProps) => {
  return (
    <div className={`${className} flex flex-col gap-3 rounded-sm bg-white p-4`}>
      <div className="grid grid-cols-1 items-center gap-1 sm:grid-cols-3">
        <div className="col-span-1 flex flex-col sm:col-span-2">
          {title && <Title className="max-h-28 overflow-auto">{title}</Title>}
          {description && <h2>{description}</h2>}
        </div>
        {actions && <div className="sm:justify-self-end">{actions}</div>}
      </div>
      <div className={className}>{children}</div>
    </div>
  );
};

export default Box;
