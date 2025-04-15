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
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-teal-100 to-blue-100 p-4">
      <Card className="w-full max-w-md md:max-w-lg bg-white rounded-xl shadow-xl overflow-hidden">
        <CardHeader className="text-center">
          <CardTitle className="text-4xl font-extrabold text-teal-700 tracking-tight">MediVault</CardTitle>
          <CardDescription className="text-lg text-gray-600">
            Securely Manage Your Medical Records
          </CardDescription>
        </CardHeader>
        <CardContent className="p-8">
          <p className="text-gray-700 text-center text-lg">
            Redirecting to upload page...
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

