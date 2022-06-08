import { useMemo } from 'react';

interface DataDisplayProps {
  children: React.ReactNode;
}

const DataDisplay = ({ children }: DataDisplayProps) => {
  return (
    <div className={`p-2 border text-neutral-700 border-neutral-300`}>
      {children}
    </div>
  );
};

export default DataDisplay;
