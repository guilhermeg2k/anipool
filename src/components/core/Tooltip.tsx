import { ReactNode, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

const TOOLTIP_PORTAL_ID = 'tooltip-portal';

interface TooltipProps {
  title?: string;
  children: ReactNode;
}

const Tooltip = ({ title = '', children }: TooltipProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const { x, y, width, height } = ref.current
    ? ref.current.getBoundingClientRect()
    : { x: 0, y: 0, width: 0, height: 0 };

  const position = {
    left: x + window.pageXOffset,
    top: y + window.pageYOffset + height,
  };

  let portalElement = document.getElementById(TOOLTIP_PORTAL_ID);
  if (!portalElement) {
    portalElement = document.createElement('div');
    portalElement.id = TOOLTIP_PORTAL_ID;
    document.body.appendChild(portalElement);
  }

  return (
    <div
      className="relative"
      ref={ref}
      onMouseEnter={() => {
        setIsVisible(true);
      }}
      onMouseLeave={() => {
        setIsVisible(false);
      }}
    >
      {children}
      {title &&
        portalElement &&
        createPortal(
          <div
            className="absolute z-20"
            style={{
              left: `${position.left}px`,
              top: `${position.top}px`,
              display: isVisible ? 'block' : 'none',
              transform: `translateX(calc(-50% + ${width / 2}px))`,
            }}
          >
            <div className="mt-2 whitespace-nowrap rounded bg-gray-900 bg-opacity-75 py-1.5 px-4 text-sm font-semibold">
              <span className="text-white">{title}</span>
            </div>
          </div>,
          portalElement
        )}
    </div>
  );
};

export default Tooltip;
