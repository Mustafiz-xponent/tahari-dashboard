"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff, Lock, Mail, Phone } from "lucide-react";
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
import { setUser } from "@/redux/slices/userSlice";
import { loginSchema } from "@/lib/validations/authSchema";
import { useRouter } from "next/navigation";
import { useLoginMutation } from "@/redux/services/authApi";
import { useAppDispatch } from "@/redux/hooks";
import { IApiError } from "@/types";
import { toast } from "sonner";
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
  async function onSubmit(formData: z.infer<typeof loginSchema>) {
    try {
      const response = await loginHandler(formData).unwrap();
      router.push("/");
      dispatch(setUser(response?.data?.user));
      const successMessage = "Login successful.";
      toast.success(successMessage);
      form.reset();
    } catch (err: unknown) {
      const error = err as IApiError;
      const errorMessage = error?.data?.message || "Something went wrong.";
      toast.error(errorMessage);
    }
  }

  return (
    <div className="min-h-screen  bg-gradient-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-form border-none animate-fade-in">
        <CardHeader className="space-y-2 text-center pb-8">
          <div className="w-16 h-16 bg-brand-75 rounded-full flex items-center justify-center mx-auto mb-4 shadow-subtle">
            <Lock className="w-8 h-8 text-primary-foreground " />
          </div>
          <CardTitle className="text-2xl sm:text-3xl font-primary font-bold">
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
                          className="pl-10 h-12 border-border font-primary  transition-smooth"
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
                          className="pl-10 pr-10 h-12 border-border font-primary transition-smooth"
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
                <a
                  href="#"
                  className="text-primary hover:text-primary/80 font-medium transition-smooth"
                >
                  Forgot password?
                </a>
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-12 hover:bg-btn-hover bg-brand-100 text-primary-foreground cursor-pointer font-medium shadow-subtle hover:shadow-form transition-all duration-300 hover:scale-[1.01]"
              >
                {isLoading ? (
                  <LoadingSpinner
                    color="#fff"
                    size={30}
                    borderWidth="3px"
                    height="100%"
                  />
                ) : (
                  "Login"
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
