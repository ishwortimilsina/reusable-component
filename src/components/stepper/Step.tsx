import { JSX, useEffect, useState } from 'react';
import classes from './Stepper.module.css';

interface StepProps {
  idx: number;
  totalSteps: number;
  activeStep: number;
  title: string;
  content: JSX.Element;
  onStepChange: (step: number) => void;
}

export const Step = ({ idx, totalSteps, activeStep, title, content, onStepChange }: StepProps) => {
  const [isCollapsed, setIsCollapsed] = useState(true);

  useEffect(() => {
    if (idx === activeStep) {
      setIsCollapsed(false);
    } else {
      setIsCollapsed(true);
    }
  }, [activeStep, idx]);

  return (
    <div className={`${classes.stepper} ${idx !== activeStep ? classes.disabledStepper : ''}`}>
      <h3 className={classes.stepperTitle}>
        <div className={classes.stepperIndex}>{idx + 1}</div>
        {title}
      </h3>
      {idx === activeStep ? (
        <div className={`${classes.stepperMain}
          ${!isCollapsed ? classes.expanded : classes.collapsed}
        `}>
          <div className={classes.stepperContent}>
            {content}
          </div>
          <div className={classes.stepperControls}>
            {idx > 0 ? (
              <button
                aria-label="Go to prev step"
                onClick={() => onStepChange(idx - 1)}
              >Back</button>
              ) : null}
            {idx < totalSteps - 1 ? (
              <button
                aria-label="Go to next step"
                onClick={() => onStepChange(idx + 1)}
              >Next</button>
              ) : null}
          </div>
        </div>
      ) : null}
    </div>
  );
};
