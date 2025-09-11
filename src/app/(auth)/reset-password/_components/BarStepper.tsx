import React from "react";
import { twMerge } from "tailwind-merge";

type BarStepperProps = {
  totalSteps: number;
  currentStep: number; // 1-based index
  className?: string;
};

const BarStepper: React.FC<BarStepperProps> = ({
  totalSteps,
  currentStep,
  className,
}) => {
  return (
    <div
      className={twMerge(
        "w-full h-1 sm:h-1.5 flex transition-all duration-300 gap-2 my-5",
        className
      )}
    >
      {Array.from({ length: totalSteps }, (_, index) => (
        <div
          key={index}
          className={twMerge(
            "flex-1 h-full rounded-full transition-colors duration-300",
            index + 1 <= currentStep ? "bg-brand-100" : "bg-gray-300"
          )}
        />
      ))}
    </div>
  );
};

export default BarStepper;
