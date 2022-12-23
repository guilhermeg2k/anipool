import React from 'react';

const DataDisplay = ({
  children,
  className = '',
  ...rest
}: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div className={`border border-neutral-300 p-2 ${className}`} {...rest}>
      {children}
    </div>
  );
};

export default DataDisplay;
