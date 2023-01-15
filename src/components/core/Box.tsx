interface BoxProps {
  children?: React.ReactNode;
  className?: string;
}

const Box = ({ children, className = '' }: BoxProps) => {
  return (
    <div className={`flex flex-col gap-3 rounded-sm bg-white p-4 ${className}`}>
      {children}
    </div>
  );
};

export default Box;
