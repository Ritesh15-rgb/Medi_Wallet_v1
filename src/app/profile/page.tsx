import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";

export default function Profile() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-secondary p-4">
      <Card className="w-full max-w-md bg-white rounded-lg shadow-md overflow-hidden">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-primary">User Profile</CardTitle>
          <CardDescription className="text-gray-600">
            Manage your profile information.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <p className="text-gray-700">
            This is the profile page where user information will be displayed.
          </p>
          {/* Add more profile info here */}
        </CardContent>
      </Card>
    </div>
  );
}
