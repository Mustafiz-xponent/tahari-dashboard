"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Eye,
  EyeOff,
  Lock,
  Phone,
  MailOpen,
  ArrowRight,
  MoveLeft,
  RectangleEllipsis,
  PartyPopper,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { resetPasswordSchema } from "@/lib/validations/authSchema";
import { useRouter } from "next/navigation";
import { useResetPasswordMutation } from "@/redux/services/authApi";
import { IApiError } from "@/types";
import { toast } from "sonner";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import BarStepper from "@/app/(auth)/reset-password/_components/BarStepper";
import ResendCodeBtn from "./ResendCodeBtn";
import { useAppDispatch } from "@/redux/hooks";
import { clearForgotPasswordPhone } from "@/redux/slices/userSlice";
type Step = 1 | 2 | 3;

const ResetPasswordForm = () => {
  const [currentStep, setCurrentStep] = useState<Step>(1);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);
  const togglePassword = () => setShowPassword(!showPassword);
  const toggleConfirmPassword = () =>
    setShowConfirmPassword(!showConfirmPassword);
  const [resetPasswordHandler, { isLoading }] = useResetPasswordMutation();
  const router = useRouter();
  const dispatch = useAppDispatch();

  const form = useForm<z.infer<typeof resetPasswordSchema>>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      otp: "",
      phone: "",
      password: "",
      confirmPassword: "",
    },
  });

  const handleNextStep = () => {
    if (form.getValues("otp").length !== 6) {
      form.setError("otp", { message: "Please enter a valid OTP" });
      return;
    }
    setCurrentStep((step) => (step === 1 ? 2 : 1));
  };

  const handlePreviousStep = () => {
    setCurrentStep((step) => (step === 2 ? 1 : 1));
  };

  async function onSubmit(formData: z.infer<typeof resetPasswordSchema>) {
    try {
      const bodyData = {
        otp: formData.otp,
        phone: formData.phone,
        password: formData.password,
      };
      const response = await resetPasswordHandler(bodyData).unwrap();
      if (response?.success) {
        setCurrentStep((step) => (step === 2 ? 3 : 1));
        form.reset();
        dispatch(clearForgotPasswordPhone());
      }
    } catch (err: unknown) {
      const error = err as IApiError;
      const errMsg = error?.data?.error?.message || "Something went wrong.";
      toast.error(errMsg);
    }
  }

  return (
    <div className="min-h-screen flex items-center flex-col justify-center p-4">
      <Card className="w-full max-w-md shadow-form border-none transition-all duration-300 animate-fade-in">
        <CardHeader className="space-y-1 text-center pb-8">
          <div className="w-16 h-16 bg-brand-75 rounded-full flex items-center justify-center mx-auto mb-4 shadow-subtle">
            {currentStep === 1 && (
              <MailOpen className="w-8 h-8 text-primary-foreground" />
            )}
            {currentStep === 2 && (
              <RectangleEllipsis className="w-8 h-8 text-primary-foreground" />
            )}
            {currentStep === 3 && (
              <PartyPopper className="w-8 h-8 text-primary-foreground" />
            )}
          </div>
          <CardTitle className="text-2xl font-primary font-bold">
            {currentStep === 1 && "Reset Password"}
            {currentStep === 2 && "Set New Password"}
            {currentStep === 3 && "Password Reset Complete"}
          </CardTitle>
          <CardDescription className="text-muted-foreground font-secondary">
            {currentStep === 1 && "Enter the 6-digit OTP sent to your device"}
            {currentStep === 2 && "Must be at least 6 characters."}
            {currentStep === 3 &&
              "Your password has been successfully reset. You can now use your new password to log in."}
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-4 transition-all duration-300"
            >
              {currentStep === 1 && (
                <>
                  <FormField
                    control={form.control}
                    name="otp"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Verification Code</FormLabel>
                        <FormControl>
                          <InputOTP maxLength={6} {...field}>
                            <InputOTPGroup className="w-full">
                              {Array.from({ length: 6 }).map((_, index) => (
                                <InputOTPSlot
                                  key={index}
                                  index={index}
                                  className="w-1/6 h-12 text-base font-medium transition-smooth data-[active=true]:ring-0 data-[active=true]:border-border"
                                />
                              ))}
                            </InputOTPGroup>
                          </InputOTP>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <ResendCodeBtn />
                  <Button
                    type="button"
                    onClick={handleNextStep}
                    className="w-full h-12 hover:bg-btn-hover bg-brand-100 text-primary-foreground cursor-pointer font-medium shadow-subtle hover:shadow-form transition-all duration-300 hover:scale-[1.01]"
                  >
                    <span>Next</span>
                    <ArrowRight className="w-4 h-4" />
                  </Button>{" "}
                </>
              )}
              {currentStep === 2 && (
                <>
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel
                          htmlFor="phone"
                          className="text-sm font-medium font-secondary"
                        >
                          Phone
                        </FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Phone className="absolute left-3 top-4 h-4 w-4 text-muted-foreground" />
                            <Input
                              placeholder="Your Phone"
                              type="text"
                              {...field}
                              className="pl-10 h-12 border-border font-primary focus-visible:border-border focus-visible:ring-0 transition-smooth"
                            />
                          </div>
                        </FormControl>
                        <FormMessage className="font-primary" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel
                          htmlFor="password"
                          className="text-sm font-medium font-secondary"
                        >
                          New Password
                        </FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Lock className="absolute left-3 top-3.5 h-4 w-4 text-muted-foreground" />
                            <Input
                              placeholder="Your Password"
                              autoComplete="on"
                              type={showPassword ? "text" : "password"}
                              {...field}
                              className="pl-10 pr-10 h-12 focus-visible:border-border focus-visible:ring-0 border-border font-primary transition-smooth"
                            />

                            <button
                              onClick={togglePassword}
                              type="button"
                              className="absolute right-3 top-4 font-primary cursor-pointer h-4 w-4 text-muted-foreground hover:text-foreground transition-smooth"
                            >
                              {showPassword ? (
                                <EyeOff className="h-5 w-5" />
                              ) : (
                                <Eye className="h-5 w-5" />
                              )}
                            </button>
                          </div>
                        </FormControl>
                        <FormMessage className="font-primary" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel
                          htmlFor="confirmPassword"
                          className="text-sm font-medium font-secondary"
                        >
                          Confirm Password
                        </FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Lock className="absolute left-3 top-3.5 h-4 w-4 text-muted-foreground" />
                            <Input
                              placeholder="Confirm Password"
                              autoComplete="on"
                              type={showConfirmPassword ? "text" : "password"}
                              {...field}
                              className="pl-10 pr-10 h-12 focus-visible:border-border focus-visible:ring-0 border-border font-primary transition-smooth"
                            />

                            <button
                              onClick={toggleConfirmPassword}
                              type="button"
                              className="absolute right-3 top-4 font-primary cursor-pointer h-4 w-4 text-muted-foreground hover:text-foreground transition-smooth"
                            >
                              {showPassword ? (
                                <EyeOff className="h-5 w-5" />
                              ) : (
                                <Eye className="h-5 w-5" />
                              )}
                            </button>
                          </div>
                        </FormControl>
                        <FormMessage className="font-primary" />
                      </FormItem>
                    )}
                  />
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full h-12 hover:bg-btn-hover bg-brand-100 text-primary-foreground cursor-pointer font-medium shadow-subtle hover:shadow-form transition-all duration-300 hover:scale-[1.01]"
                  >
                    {isLoading ? (
                      <LoadingSpinner
                        color="#fff"
                        size={25}
                        borderWidth="3px"
                        height="100%"
                      />
                    ) : (
                      "Submit"
                    )}
                  </Button>
                  <Button
                    type="button"
                    onClick={handlePreviousStep}
                    className="flex items-center bg-transparent hover:bg-transparent shadow-none cursor-pointer w-full gap-2 text-gray-400 font-secondary text-sm font-medium hover:text-gray-500 transition-all duration-300 justify-center"
                  >
                    <MoveLeft className="w-4 h-4" /> <span>Back</span>
                  </Button>
                </>
              )}
            </form>
          </Form>
          {currentStep === 3 && (
            <Button
              type="button"
              onClick={() => router.push("/login")}
              className="w-full h-12 hover:bg-btn-hover bg-brand-100 text-primary-foreground cursor-pointer font-medium shadow-subtle hover:shadow-form transition-all duration-300 hover:scale-[1.01]"
            >
              <MoveLeft className="w-4 h-4" /> <span>Back to login</span>
            </Button>
          )}
        </CardContent>
      </Card>

      <BarStepper
        totalSteps={3}
        currentStep={currentStep}
        className="max-w-md"
      />
    </div>
  );
};

export default ResetPasswordForm;
