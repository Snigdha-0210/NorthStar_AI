"use client";
import { useAppStore } from "@/store/useAppStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

export default function SettingsPage() {
  const { user } = useAppStore();

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Settings saved successfully.");
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">Manage your account settings and preferences.</p>
      </div>

      <Card className="max-w-2xl">
        <CardHeader>
          <CardTitle>Profile Information</CardTitle>
          <CardDescription>Update your profile details here.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSave} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" defaultValue={user?.name} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" defaultValue={user?.email} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="title">Job Title</Label>
              <Input id="title" defaultValue={user?.title} />
            </div>
            <Button type="submit">Save Changes</Button>
          </form>
        </CardContent>
      </Card>
      <Card className="max-w-2xl mt-6">
        <CardHeader>
          <CardTitle>API Configuration</CardTitle>
          <CardDescription>Update your API keys here if you run out of tokens.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={async (e) => {
            e.preventDefault();
            const form = e.target as HTMLFormElement;
            const groqKey = (form.elements.namedItem("groq") as HTMLInputElement).value;
            const geminiKey = (form.elements.namedItem("gemini") as HTMLInputElement).value;
            
            try {
              const res = await fetch("http://localhost:8000/api/settings/keys", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  groq_api_key: groqKey || undefined,
                  gemini_api_key: geminiKey || undefined
                })
              });
              if (res.ok) {
                toast.success("API keys updated successfully.");
                form.reset();
              } else {
                toast.error("Failed to update API keys.");
              }
            } catch (err) {
              toast.error("Failed to update API keys.");
            }
          }} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="groq">Groq API Key</Label>
              <Input id="groq" type="password" placeholder="gsk_..." />
            </div>
            <div className="space-y-2">
              <Label htmlFor="gemini">Gemini API Key</Label>
              <Input id="gemini" type="password" placeholder="AIzaSy..." />
            </div>
            <Button type="submit" variant="secondary">Update Keys</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
