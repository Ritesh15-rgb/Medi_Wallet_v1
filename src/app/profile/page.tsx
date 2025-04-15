"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function Profile() {
  const [name, setName] = useState("John Doe");
  const [email, setEmail] = useState("john.doe@example.com");
  const [contact, setContact] = useState("(123) 456-7890");
  const [bio, setBio] = useState("A brief bio about John Doe.");
  const [isEditing, setIsEditing] = useState(false);
  const [profilePhoto, setProfilePhoto] = useState("https://picsum.photos/id/237/200/300");

  const handleSave = () => {
    // Implement save functionality here, e.g., update Firebase
    setIsEditing(false);
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      //Basic validation
      if (file.size > 1024 * 1024 * 5) {
        alert("File size exceeds 5MB");
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        if (reader.result && typeof reader.result === 'string') {
          setProfilePhoto(reader.result);
        }
      };
      reader.readAsDataURL(file);

    }
  };


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
              <AvatarImage src={profilePhoto} alt="User Avatar" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            {isEditing && (
              <Input
                type="file"
                accept="image/*"
                onChange={handlePhotoChange}
                className="mb-2"
              />
            )}
          </div>

          <div className="flex flex-col space-y-4 mt-4">
            {isEditing ? (
              <>
                <Input
                  type="text"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mb-2"
                />
                <Input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mb-2"
                />
                <Input
                  type="tel"
                  placeholder="Contact Number"
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  className="mb-2"
                />
                <textarea
                  placeholder="Bio"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 mb-2"
                />
                <Button onClick={handleSave}>Save Changes</Button>
              </>
            ) : (
              <>
                <p className="text-lg font-semibold">{name}</p>
                <p className="text-gray-500">{email}</p>
                <p className="text-gray-500">{contact}</p>
                <p className="text-gray-500">{bio}</p>
                <Button onClick={() => setIsEditing(true)}>Edit Profile</Button>
              </>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
