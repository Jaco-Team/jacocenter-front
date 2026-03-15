import React, { useState } from 'react';
import { ITooltipUIProps } from './Tooltip.types';
import './Tooltip.styles.css';

export const Tooltip: React.FC<ITooltipUIProps> = ({
  children,
  content,
  trigger = 'hover',
  placement = 'top',
  className,
}) => {
  const [open, setOpen] = useState(false);

  const openTooltip = () => setOpen(true);
  const closeTooltip = () => setOpen(false);
  const toggleTooltip = () => setOpen((prev) => !prev);

  const triggerProps =
    trigger === 'hover'
      ? {
          onMouseEnter: openTooltip,
          onMouseLeave: closeTooltip,
        }
      : {
          onClick: toggleTooltip,
        };

    const placementClass = `tooltip-${placement}`;

  return (
    <>
      {open && trigger === 'click' && (
        <div className='tooltip-overlay' onClick={closeTooltip} />
      )}

      <div className='tooltip-wrapper' {...triggerProps}>
        {children}

        {open && (
          <div className={`tooltip-content ${placementClass} ${className ?? ''}`}>
            {content}
          </div>
        )}
      </div>
    </>
  );
};