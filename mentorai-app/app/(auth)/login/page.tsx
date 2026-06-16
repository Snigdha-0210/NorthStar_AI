"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function LoginPage() {
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Successfully logged in!");
    router.push("/dashboard");
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-2xl font-bold tracking-tight">Welcome back</h1>
        <p className="text-sm text-muted-foreground">Enter your email to sign in to your account</p>
      </div>
      <form onSubmit={handleLogin} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="m@example.com" required defaultValue="alex@example.com" />
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Password</Label>
            <Link href="#" className="text-sm text-primary hover:underline">Forgot password?</Link>
          </div>
          <Input id="password" type="password" required defaultValue="password" />
        </div>
        <Button type="submit" className="w-full">Sign In</Button>
      </form>
      <div className="text-center text-sm">
        Don&apos;t have an account?{" "}
        <Link href="/register" className="text-primary hover:underline">Sign up</Link>
      </div>
    </div>
  );
}
