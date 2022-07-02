interface DataDisplayProps {
  children: React.ReactNode;
}

const DataDisplay = ({ children }: DataDisplayProps) => {
  return <div className={`border border-neutral-300 p-2 `}>{children}</div>;
};

export default DataDisplay;
