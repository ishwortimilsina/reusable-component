import { JSX } from "react";
import classes from './Stepper.module.css';
import { Step } from "./Step";

interface StepperProps {
  steps: {
    title: string;
    content: JSX.Element;
  }[];
  onStepChange: (_idx: number) => void;
  activeStep: number;
}

export const Stepper = ({ steps, onStepChange, activeStep }: StepperProps) => (
  <div className={classes.stepperContainer}>
    {steps.length ? steps.map((step, idx) => (
      <Step
        totalSteps={steps.length}
        idx={idx}
        title={step.title}
        content={step.content}
        onStepChange={onStepChange}
        activeStep={activeStep}
      />
    )) : null}
  </div>
);
