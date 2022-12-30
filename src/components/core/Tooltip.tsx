import { HTMLAttributes } from 'react';

interface TooltipProps extends HTMLAttributes<HTMLDivElement> {
  title?: string;
}

const Tooltip = ({ title = '', children }: TooltipProps) => {
  return (
    <div className="group relative inline-block">
      {children}
      <div className="invisible absolute top-full left-1/2 z-20 mt-3 -translate-x-1/2 whitespace-nowrap rounded bg-black bg-opacity-75 py-[6px] px-4 text-sm font-semibold group-hover:visible">
        <span className="pointer-events-none text-white group-hover:pointer-events-auto">
          {title}
        </span>
      </div>
    </div>
  );
};

export default Tooltip;
