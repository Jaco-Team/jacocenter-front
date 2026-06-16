import React, { useRef } from 'react';
import { useId } from 'react';
import { ITooltipUIProps } from './Tooltip.types';
import './Tooltip.styles.css';
import { Text } from '../Typography/Typography';

export const Tooltip: React.FC<ITooltipUIProps> = ({
  children,
  content,
  trigger = 'hover',
  placement = 'top',
  className,
}) => {
  const popoverRef = useRef<HTMLDivElement>(null);
  const id = useId();
  const anchorName = `--anchor-${id}`;

  const openTooltip = () => popoverRef.current?.showPopover();
  const closeTooltip = () => popoverRef.current?.hidePopover();
  const toggleTooltip = () => {
    if (popoverRef.current?.matches(':popover-open')) {
      popoverRef.current?.hidePopover();
    } else {
      popoverRef.current?.showPopover();
    }
  };

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
    <div className='tooltip-wrapper' style={{ anchorName }} {...triggerProps}>
      {children}
      <div
        ref={popoverRef}
        popover="auto"
        className={`tooltip-content ${placementClass} ${className ?? ''}`}
        style={{ positionAnchor: anchorName }}
      >
        <Text variant='label-s-regular-12' className='tooltip-content-text'>{content}</Text>
      </div>
    </div>
  );
};