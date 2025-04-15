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
// import { useTheme } from 'next-themes';

export default function Settings() {
  // const { theme, setTheme } = useTheme();
  const [isDarkMode, setIsDarkMode] = useState(false); // Initialize with current theme

  useEffect(() => {
    setIsDarkMode(false);
  }, []);

  const toggleTheme = () => {
    //const newTheme = theme === 'light' ? 'dark' : 'light';
    //setTheme(newTheme);
    setIsDarkMode(!isDarkMode);
  };

  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

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

          {/* Save Button */}
          <Button onClick={handleSave}>Save Changes</Button>
        </CardContent>
      </Card>
    </div>
  );
}
