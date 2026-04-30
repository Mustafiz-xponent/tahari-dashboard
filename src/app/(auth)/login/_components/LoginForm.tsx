"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff, Lock, Phone } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import { setUser } from "@/redux/slices/userSlice";
import { loginSchema } from "@/lib/validations/authSchema";
import { useRouter } from "next/navigation";
import { useLoginMutation } from "@/redux/services/authApi";
import { useAppDispatch } from "@/redux/hooks";
import { IApiError } from "@/types";
import { toast } from "sonner";
import Link from "next/link";
import FormSubmitBtn from "@/components/common/form/FormSubmitBtn";

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const togglePassword = () => setShowPassword(!showPassword);
  const [loginHandler, { isLoading }] = useLoginMutation();
  const router = useRouter();
  const dispatch = useAppDispatch();

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      phone: "",
      password: "",
    },
  });
  // async function onSubmit(formData: z.infer<typeof loginSchema>) {
  //   try {
  //     const response = await loginHandler(formData).unwrap();
  //     router.push("/");
  //     dispatch(setUser(response?.data));
  //     const successMessage = response?.message || "Login successful.";
  //     toast.success(successMessage);
  //     form.reset();
  //   } catch (err: unknown) {
  //     const error = err as IApiError;
  //     const errorMessage =
  //       error?.data?.error?.message || "Something went wrong.";
  //     toast.error(errorMessage);
  //   }
  // }

  async function onSubmit(formData: z.infer<typeof loginSchema>) {
    try {
      const response = await loginHandler(formData).unwrap();

      // Set token cookie so middleware can read it
      document.cookie = `token=${response?.data?.token}; path=/; max-age=${60 * 60 * 24 * 7}; SameSite=Lax`;

      dispatch(setUser(response?.data));
      router.push("/");
      toast.success(response?.message || "Login successful.");
      form.reset();
    } catch (err: unknown) {
      const error = err as IApiError;
      toast.error(error?.data?.error?.message || "Something went wrong.");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-form border-none animate-fade-in">
        <CardHeader className="space-y-1 text-center pb-8">
          <div className="w-16 h-16 bg-brand-75 rounded-full flex items-center justify-center mx-auto mb-4 shadow-subtle">
            <Lock className="w-8 h-8 text-primary-foreground " />
          </div>
          <CardTitle className="text-2xl font-primary font-bold">
            Welcome back
          </CardTitle>
          <CardDescription className="text-muted-foreground font-secondary">
            Login to your account to continue
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
                          className="pl-10 h-12 border-border font-primary focus-visible:border-border focus-visible:ring-0  transition-smooth"
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
                      htmlFor="phone"
                      className="text-sm font-medium font-secondary"
                    >
                      Password
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3.5 h-4 w-4 text-muted-foreground" />
                        <Input
                          placeholder="Password"
                          autoComplete="on"
                          type={showPassword ? "text" : "password"}
                          {...field}
                          className="pl-10 pr-10 h-12 border-border focus-visible:border-border focus-visible:ring-0 font-primary transition-smooth"
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
              <div className="flex items-center justify-end text-sm">
                <Link
                  href="forgot-password"
                  className="text-primary hover:text-primary/80 font-medium transition-smooth"
                >
                  Forgot password?
                </Link>
              </div>
              <FormSubmitBtn isLoading={isLoading} text="Login" />
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
