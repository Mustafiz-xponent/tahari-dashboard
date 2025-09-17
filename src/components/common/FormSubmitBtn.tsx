import React from "react";
import { twMerge } from "tailwind-merge";
import { Button } from "@/components/ui/button";
import LoadingSpinner from "@/components/common/LoadingSpinner";

interface FormSubmitBtnProps {
  isLoading: boolean;
  className?: string;
  text: string;
  spinnerSize?: number;
}
const FormSubmitBtn = ({
  isLoading,
  text,
  className,
  spinnerSize = 25,
}: FormSubmitBtnProps) => {
  return (
    <Button
      type="submit"
      disabled={isLoading}
      className={twMerge(
        `w-full h-12 hover:bg-btn-hover bg-brand-100 text-primary-foreground cursor-pointer font-medium shadow-subtle hover:shadow-form transition-all duration-300 hover:scale-[1.01]`,
        className
      )}
    >
      {isLoading ? (
        <LoadingSpinner
          color="#fff"
          size={spinnerSize}
          borderWidth="3px"
          height="100%"
        />
      ) : (
        text
      )}
    </Button>
  );
};

export default FormSubmitBtn;
