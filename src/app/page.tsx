"use client";

import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {useRouter} from "next/navigation";
import {useEffect} from "react";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to the upload page after a short delay
    const timer = setTimeout(() => {
      router.push("/upload");
    }, 1500);

    return () => clearTimeout(timer); // Cleanup the timer if the component unmounts
  }, [router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-secondary">
      <Card className="w-full max-w-md bg-white rounded-lg shadow-md overflow-hidden">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold text-primary">MediVault</CardTitle>
          <CardDescription className="text-md text-gray-600">
            Securely Manage Your Medical Records
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <p className="text-gray-700 text-center">
            Redirecting to upload page...
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
