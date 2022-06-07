import { Children } from 'react';

interface BoxProps {
  children: React.ReactNode;
  className?: string;
}

const Box = ({ children, className }: BoxProps) => {
  return <div className={`p-4 rounded-sm bg-white ${className}`}>{children}</div>;
};

export default Box;
