interface DataDisplayProps {
  className?: string;
  children: React.ReactNode;
}

const DataDisplay = ({ children, className = '' }: DataDisplayProps) => {
  return (
    <div className={`border border-neutral-300 p-2 ${className}`}>
      {children}
    </div>
  );
};

export default DataDisplay;
