"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { LogOut } from 'lucide-react'; // Import LogOut icon
import { useRouter } from 'next/navigation'; // Import useRouter
import { signOut, getAuth } from 'firebase/auth';
import { initializeApp, getApps } from "firebase/app";
import { firebaseConfig } from "@/lib/firebase/config";
import { useToast } from "@/hooks/use-toast";

// Initialize Firebase if not already initialized
if (!getApps().length) {
  try {
    initializeApp(firebaseConfig);
  } catch (e: any) {
    if (e.code !== 'app/duplicate-app') {
      console.error('Firebase initialization error', e.message);
    }
  }
}

// Initialize Firebase auth
let auth;
if (firebaseConfig && firebaseConfig.apiKey) {
    auth = getAuth();
}

export default function Settings() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    // Check local storage for theme preference on component mount
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme) {
      setIsDarkMode(storedTheme === 'dark');
    } else {
      // If no preference in local storage, respect system preference
      setIsDarkMode(window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
  }, []);

  useEffect(() => {
    // Apply theme and save preference to local storage when isDarkMode changes
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      toast({
        title: "Success",
        description: "Signed out successfully!",
      });
      router.push("/"); // Redirect to home page after signing out
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to sign out.",
        variant: "destructive",
      });
    }
  };

  const handleSave = () => {
    // Implement save functionality here
    alert("Settings saved!");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <Card className="w-full max-w-md md:max-w-lg rounded-xl shadow-lg overflow-hidden">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold">Settings</CardTitle>
          <CardDescription>Manage your application settings.</CardDescription>
        </CardHeader>
        <CardContent className="p-8 space-y-6">
          {/* Theme Settings */}
          <div>
            <h3 className="text-xl font-semibold mb-2">Theme Settings</h3>
            <div className="flex items-center justify-between">
              <Label htmlFor="darkMode">Dark Mode</Label>
              <Switch
                id="darkMode"
                checked={isDarkMode}
                onCheckedChange={toggleTheme}
              />
            </div>
          </div>

          {/* Notification Settings */}
          <div>
            <h3 className="text-xl font-semibold mb-2">Notification Settings</h3>
            <div className="flex items-center justify-between">
              <Label htmlFor="notifications">Enable Notifications</Label>
              <Switch
                id="notifications"
                checked={notificationsEnabled}
                onCheckedChange={(checked) => setNotificationsEnabled(checked)}
              />
            </div>
          </div>

          {/* Sign Out Button */}
          <div>
            <Button variant="destructive" onClick={handleSignOut} className="w-full">
              Sign Out <LogOut className="ml-2" />
            </Button>
          </div>

          {/* Save Button */}
          <Button onClick={handleSave}>Save Changes</Button>
        </CardContent>
      </Card>
    </div>
  );
}
