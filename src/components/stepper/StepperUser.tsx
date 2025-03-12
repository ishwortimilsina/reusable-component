import { useState } from "react";
import { Stepper } from "./Stepper";

export const StepperUser = () => {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    { title: "Personal Information", content: <PersonalInfoForm /> },
    { title: "Account Details", content: <AccountDetailsForm /> },
    { title: "Review & Submit", content: <ReviewForm /> }
  ];

  const handleStepChange = (newStepIndex: number) => {
    setActiveStep(newStepIndex);
  };

  return (
    <div>
      <h2>Signup Process</h2>
      <Stepper
        steps={steps}
        onStepChange={handleStepChange}
        activeStep={activeStep}
      />
    </div>
  );
};

const PersonalInfoForm = () => (
  <div>
    <h3>Personal Info</h3>
    <input type="text" placeholder="Name" />
    <input type="email" placeholder="Email" />
  </div>
);

const AccountDetailsForm = () => (
  <div>
    <h3>Account Details</h3>
    <input type="password" placeholder="Password" />
    <input type="password" placeholder="Confirm Password" />
  </div>
);

const ReviewForm = () => (
  <div>
    <h3>Review</h3>
    <p>Review your information before submitting.</p>
  </div>
);
