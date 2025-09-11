"use client";
import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useForgotPasswordMutation } from "@/redux/services/authApi";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { IApiError } from "@/types";
import { toast } from "sonner";
import { setOtpResendCooldown } from "@/redux/slices/userSlice";

const ResendCodeBtn = () => {
  const { resetPasswordPhone, otpResendCooldown } = useAppSelector(
    (state) => state.userReducer
  );
  const [forgotPasswordHandler, { isLoading }] = useForgotPasswordMutation();
  const dispatch = useAppDispatch();

  // Prevent form resubmission within 1 minute
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (otpResendCooldown > 0) {
      timer = setInterval(() => {
        if (otpResendCooldown > 0) {
          dispatch(setOtpResendCooldown(otpResendCooldown - 1));
        }
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [dispatch, otpResendCooldown]);

  const handleResendOtp = async () => {
    try {
      const bodyData = {
        phone: resetPasswordPhone,
      };
      const response = await forgotPasswordHandler(bodyData).unwrap();
      console.log("Resend OTP Response:", response);
      if (response.success) {
        const successMessage = "OTP has been resent.";
        toast.success(successMessage);
        dispatch(setOtpResendCooldown(60)); // start countdown (1 minute)
      }
    } catch (err: unknown) {
      const error = err as IApiError;
      const errorMessage =
        error?.data?.error?.message || "Something went wrong.";
      toast.error(errorMessage);
    }
  };

  return (
    <Button
      type="button"
      disabled={isLoading || otpResendCooldown > 0}
      className="text-center w-full bg-transparent hover:bg-transparent shadow-none text-gray-500"
    >
      Didn&apos;t receive the code?{" "}
      <span
        onClick={handleResendOtp}
        className="text-brand-100 hover:text-btn-hover transition-all duration-300 opacity-80 cursor-pointer"
      >
        {otpResendCooldown > 0
          ? `Resend in ${otpResendCooldown}s`
          : "Resend OTP"}
      </span>
    </Button>
  );
};

export default ResendCodeBtn;
