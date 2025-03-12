import { ReactNode, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import classes from './Tooltip.module.css';

interface TooltipProps {
  children: ReactNode;
}

export const Tooltip = ({ children }: TooltipProps) => {
  const elemRef = useRef<HTMLDivElement | null>(null);
  const tooltipRef = useRef<HTMLDivElement | null>(null);
  const [show, setShow] = useState(false);
  const [tooltipLocation, setTooltipLocation] = useState<{
    top: number;
    left: number;
  } | null>(null);

  const handleMouseEnter = () => {
    setShow(true);
    if (elemRef.current) {
      const rect = elemRef.current?.getBoundingClientRect();
      setTooltipLocation({
        top: rect.top + rect.height + 5,
        left: rect.left - Math.ceil(rect.width / 2)
      });
    }
  };

  useEffect(() => {
    if (tooltipRef.current && tooltipLocation && elemRef.current) {
      const { innerWidth, innerHeight } = window;
      const { height, width, top, left } = tooltipRef.current.getBoundingClientRect();
      const { height: elemHeight } = elemRef.current.getBoundingClientRect();

      let newTooltipTop = top;
      let newTooltipLeft = left;
      if (top + height > innerHeight) {
        newTooltipTop = top - height - elemHeight - 5;
      }
      if (left + width > innerWidth) {
        newTooltipLeft = innerWidth - width - 5;
      }

      if (left < 0) {
        newTooltipLeft = 0 + 5;
      }

      if (top < 0) {
        newTooltipTop = 0 + 5;
      }

      if (top !== newTooltipTop || left !== newTooltipLeft) {
        setTooltipLocation({
          top: newTooltipTop,
          left: newTooltipLeft,
        });
      }
    }
  }, [show, tooltipLocation]);

  return (
    <>
      <div
        onMouseEnter={handleMouseEnter}
        onMouseLeave={() => setShow(false)}
        ref={elemRef}
        className={classes.tooltipBase}
      >
        {children}
      </div>
      {show ? createPortal(
        <div
          className={classes.tooltip}
          style={{
           top: tooltipLocation?.top,
           left: tooltipLocation?.left 
          }}
          ref={tooltipRef}
        >tooltip</div>,
        document.body
      ) : null}
    </>
  )
};
