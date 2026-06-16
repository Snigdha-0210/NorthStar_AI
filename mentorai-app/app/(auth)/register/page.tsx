"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function RegisterPage() {
  const router = useRouter();

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Account created successfully!");
    router.push("/dashboard/onboarding");
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-2xl font-bold tracking-tight">Create an account</h1>
        <p className="text-sm text-muted-foreground">Enter your details below to create your account</p>
      </div>
      <form onSubmit={handleRegister} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Full Name</Label>
          <Input id="name" placeholder="John Doe" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="m@example.com" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" required />
        </div>
        <Button type="submit" className="w-full">Sign Up</Button>
      </form>
      <div className="text-center text-sm">
        Already have an account?{" "}
        <Link href="/login" className="text-primary hover:underline">Sign in</Link>
      </div>
    </div>
  );
}
