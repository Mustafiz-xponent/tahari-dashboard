"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Phone, Fingerprint, MoveLeft } from "lucide-react";
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
import { forgotPasswordSchema } from "@/lib/validations/authSchema";
import { useRouter } from "next/navigation";
import { useForgotPasswordMutation } from "@/redux/services/authApi";
import { IApiError } from "@/types";
import { toast } from "sonner";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  setForgotPasswordPhone,
  setOtpResendCooldown,
} from "@/redux/slices/userSlice";
import { useEffect } from "react";

const ForgotPasswordForm = () => {
  const [forgotPasswordHandler, { isLoading }] = useForgotPasswordMutation();
  const { otpResendCooldown } = useAppSelector((state) => state.userReducer);
  const dispatch = useAppDispatch();
  const router = useRouter();

  // Prevent form resubmission withing
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
  }, [otpResendCooldown, dispatch]);

  const form = useForm<z.infer<typeof forgotPasswordSchema>>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      phone: "",
    },
  });
  async function onSubmit(formData: z.infer<typeof forgotPasswordSchema>) {
    try {
      const response = await forgotPasswordHandler(formData).unwrap();
      router.push("/reset-password");
      console.log("FORGOT PASSWORD RESPONSE:", response);
      if (response.success) {
        dispatch(setForgotPasswordPhone(formData.phone));
        dispatch(setOtpResendCooldown(60));
        const successMessage = response?.message || "An Otp has been sent.";
        toast.success(successMessage);
        form.reset();
      }
    } catch (err: unknown) {
      const error = err as IApiError;
      const errorMessage =
        error?.data?.error?.message || "Something went wrong.";
      toast.error(errorMessage);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-form border-none animate-fade-in">
        <CardHeader className="space-y-1 text-center pb-8">
          <div className="w-16 h-16 bg-brand-75 rounded-full flex items-center justify-center mx-auto mb-4 shadow-subtle">
            <Fingerprint className="w-8 h-8 text-primary-foreground " />
          </div>
          <CardTitle className="text-2xl font-primary font-bold">
            Forgot password?
          </CardTitle>
          <CardDescription className="text-muted-foreground font-secondary">
            No worries, we&apos;ll send you a reset instructions.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
                          className="pl-10 h-12 border-border focus-visible:border-border focus-visible:ring-0 font-primary  transition-smooth"
                        />
                      </div>
                    </FormControl>
                    <FormMessage className="font-primary" />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                disabled={isLoading || otpResendCooldown > 0}
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
            </form>
          </Form>

          <Link
            href={"/login"}
            className="flex items-center gap-2 text-gray-400 font-secondary text-sm font-medium hover:text-gray-500 transition-all duration-300 justify-center"
          >
            <MoveLeft className="w-4 h-4" /> <span>Back to login</span>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
};

export default ForgotPasswordForm;
