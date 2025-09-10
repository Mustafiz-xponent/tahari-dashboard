"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Login attempt:", formData);
    // Handle login logic here
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen  bg-gradient-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-form border-none animate-fade-in">
        <CardHeader className="space-y-2 text-center pb-8">
          <div className="w-16 h-16 bg-brand-75 rounded-full flex items-center justify-center mx-auto mb-4 shadow-subtle">
            <Lock className="w-8 h-8 text-primary-foreground " />
          </div>
          <CardTitle className="text-2xl sm:text-3xl  font-bold">
            Welcome back
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            Login to your account to continue
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium">
                Email address
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="pl-10 h-12 border-border focus:border-ring focus:ring-2 focus:ring-ring/20 transition-smooth"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium">
                Password
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="pl-10 pr-10 h-12 border-border focus:border-ring focus:ring-2 focus:ring-ring/20 transition-smooth"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 h-4 w-4 text-muted-foreground hover:text-foreground transition-smooth"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

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
              className="w-full h-12 hover:bg-btn-hover bg-brand-100 text-primary-foreground cursor-pointer font-medium shadow-subtle hover:shadow-form transition-all duration-300 hover:scale-[1.01]"
            >
              Login
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
