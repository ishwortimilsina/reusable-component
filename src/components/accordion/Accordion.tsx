import { ReactNode, useState } from "react";
import classes from './Accordion.module.css';

interface AccordionProps {
  header: string | ReactNode;
  children: ReactNode;
}

export const Accordion = ({ header, children }: AccordionProps) => {
  const [show, setShow] = useState(false);

  const handleShowChange = () => {
    setShow(!show);
  };

  return (
    <div className={classes.accordion}>
      <div
        className={classes.accordionHeader}
        onClick={handleShowChange}
      >{header}</div>
      <div className={`${classes.accordionContent} ${show ? classes.expanded : classes.collapsed}`}>
        { show ? <div className={classes.accordionContentInner}>
          {children}
        </div> : null}
      </div>
    </div>
  );
};
