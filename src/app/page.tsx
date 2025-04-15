"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { ShieldCheck, Upload, User, Search, Lock } from "lucide-react";

const LandingPage = () => {
  const router = useRouter();
  // Simple mock auth state for demonstration
  const isSignedIn = false;

  return (
    <div className="bg-white text-gray-900 min-h-screen flex flex-col">
      {/* Hero Section */}
      <header className="bg-gray-100 py-12">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl font-bold mb-4">
            Welcome to MediVault: Your Medical Records, Secured
          </h1>
          <p className="text-xl mb-8">
            Securely store, manage, and access your medical records anytime,
            anywhere.
          </p>
          {!isSignedIn ? (
            <>
              <Button
                variant="primary"
                size="lg"
                onClick={() => router.push("/upload")}
              >
                Get Started for Free
              </Button>
              <Button
                variant="secondary"
                size="lg"
                className="ml-4"
                onClick={() => router.push("/view")}
              >
                Explore Features
              </Button>
            </>
          ) : (
            <Button variant="primary" size="lg" onClick={() => router.push("/profile")}>
              Go to Your Dashboard
            </Button>
          )}
        </div>
      </header>

      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Feature 1: Secure Storage */}
          <div className="p-6 bg-gray-50 rounded-lg shadow-md">
            <ShieldCheck className="text-teal-500 w-8 h-8 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Secure Storage</h3>
            <p className="text-gray-700">
              Your data is encrypted and stored securely using Firebase
              security best practices.
            </p>
          </div>

          {/* Feature 2: Easy Upload */}
          <div className="p-6 bg-gray-50 rounded-lg shadow-md">
            <Upload className="text-blue-500 w-8 h-8 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Easy Upload</h3>
            <p className="text-gray-700">
              Easily upload your medical records in various formats, including
              PDF and images.
            </p>
          </div>

          {/* Feature 3: User Access */}
          <div className="p-6 bg-gray-50 rounded-lg shadow-md">
            <User className="text-indigo-500 w-8 h-8 mb-4" />
            <h3 className="text-xl font-semibold mb-2">User Access</h3>
            <p className="text-gray-700">
              Access your records from any device with our responsive and
              intuitive interface.
            </p>
          </div>

          {/* Feature 4: Smart Search */}
          <div className="p-6 bg-gray-50 rounded-lg shadow-md">
            <Search className="text-orange-500 w-8 h-8 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Smart Search</h3>
            <p className="text-gray-700">
              Quickly find the records you need with our advanced search and
              filtering options.
            </p>
          </div>
        </div>
      </section>

      {/* Security Assurance Section */}
      <section className="bg-gray-100 py-12">
        <div className="container mx-auto text-center">
          <Lock className="text-red-500 w-10 h-10 mx-auto mb-4" />
          <h2 className="text-3xl font-bold mb-4">
            Your Security is Our Priority
          </h2>
          <p className="text-lg">
            We use industry-leading security measures to protect your sensitive
            medical information.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-200 py-4">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center">
            <Button
              variant="link"
              size="sm"
              onClick={() => router.push("/settings")}
            >
              Settings
            </Button>
            <Button
              variant="link"
              size="sm"
              onClick={() => router.push("/profile")}
            >
              Profile
            </Button>
          </div>
          <div>
            <p className="text-gray-600">
              &copy; {new Date().getFullYear()} MediVault. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
