"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Profile() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <Card className="w-full max-w-md md:max-w-lg rounded-xl shadow-lg overflow-hidden">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold">User Profile</CardTitle>
          <CardDescription>Manage your profile information.</CardDescription>
        </CardHeader>
        <CardContent className="p-8">
          <div className="flex flex-col items-center space-y-4">
            <Avatar className="h-24 w-24">
              <AvatarImage src="https://picsum.photos/id/237/200/300" alt="User Avatar" />
              <AvatarFallback>AB</AvatarFallback>
            </Avatar>
            <div className="text-center">
              <p className="text-lg font-semibold">John Doe</p>
              <p className="text-gray-500">john.doe@example.com</p>
              <p className="text-gray-500">(123) 456-7890</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

