import { MouseEvent, ReactNode, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

interface TooltipProps {
  title?: string;
  children: ReactNode;
}

const Tooltip = ({ title = '', children }: TooltipProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const tooltipPosition = useRef({
    x: 0,
    y: 0,
  });
  const childrenWidth = useRef(0);
  const portalElement = document.getElementById('tooltip-portal');

  if (!portalElement) {
    const newToolTipPortalElement = document.createElement('div');
    newToolTipPortalElement.id = 'tooltip-portal';
    document.body.appendChild(newToolTipPortalElement);
  }

  const handleMouseEnter = (e: MouseEvent) => {
    const target = e.target as HTMLDivElement;
    const { left, bottom } = target.getBoundingClientRect();

    childrenWidth.current = target.offsetWidth;
    tooltipPosition.current = {
      x: left + window.pageXOffset,
      y: bottom + window.pageYOffset,
    };

    setIsVisible(true);
  };

  return (
    <div
      className="group relative inline-block"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={() => {
        setIsVisible(false);
      }}
    >
      {children}
      {title &&
        portalElement &&
        createPortal(
          <div
            className="absolute z-20 mt-2"
            style={{
              left: `${tooltipPosition.current.x}px`,
              top: `${tooltipPosition.current.y}px`,
              display: isVisible ? 'block' : 'none',
              transform: `translateX(calc(-50% + ${
                childrenWidth.current / 2
              }px))`,
            }}
          >
            <div className="bg-gray-900 whitespace-nowrap rounded bg-opacity-75 py-[6px] px-4 text-sm font-semibold">
              <span className="text-white">{title}</span>
            </div>
          </div>,
          portalElement
        )}
    </div>
  );
};

export default Tooltip;
