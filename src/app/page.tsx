"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { ShieldCheck, Upload, User, Search, Lock } from "lucide-react";
import { motion } from "framer-motion";

const LandingPage = () => {
  const router = useRouter();
  const isSignedIn = false;

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 1 } },
  };

  return (
    <div className="bg-white text-gray-900 min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="relative py-24 bg-gray-100 overflow-hidden">
        <div className="container mx-auto text-center relative z-10">
          <motion.h1
            className="text-5xl font-bold mb-4 text-teal-700"
            variants={fadeIn}
            initial="hidden"
            animate="visible"
          >
            Welcome to MediVault: Your Medical Records, Secured
          </motion.h1>
          <motion.p
            className="text-xl mb-8 text-gray-700"
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.5 }}
          >
            Securely store, manage, and access your medical records anytime,
            anywhere.
          </motion.p>
          {!isSignedIn ? (
            <motion.div
              className="flex justify-center"
              variants={fadeIn}
              initial="hidden"
              animate="visible"
              transition={{ delay: 1 }}
            >
              <Button
                variant="primary"
                size="lg"
                className="animate-pulse hover:bg-teal-700 transition duration-700"
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
            </motion.div>
          ) : (
            <motion.div
              variants={fadeIn}
              initial="hidden"
              animate="visible"
              transition={{ delay: 1 }}
            >
              <Button
                variant="primary"
                size="lg"
                onClick={() => router.push("/profile")}
              >
                Go to Your Dashboard
              </Button>
            </motion.div>
          )}
        </div>
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-teal-400 to-blue-500 opacity-30"></div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Feature 1: Secure Storage */}
          <motion.div
            className="p-6 bg-gray-50 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <ShieldCheck className="text-teal-500 w-8 h-8 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Secure Storage</h3>
            <p className="text-gray-700">
              Your data is encrypted and stored securely using Firebase
              security best practices.
            </p>
          </motion.div>

          {/* Feature 2: Easy Upload */}
          <motion.div
            className="p-6 bg-gray-50 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Upload className="text-blue-500 w-8 h-8 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Easy Upload</h3>
            <p className="text-gray-700">
              Easily upload your medical records in various formats, including
              PDF and images.
            </p>
          </motion.div>

          {/* Feature 3: User Access */}
          <motion.div
            className="p-6 bg-gray-50 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <User className="text-indigo-500 w-8 h-8 mb-4" />
            <h3 className="text-xl font-semibold mb-2">User Access</h3>
            <p className="text-gray-700">
              Access your records from any device with our responsive and
              intuitive interface.
            </p>
          </motion.div>

          {/* Feature 4: Smart Search */}
          <motion.div
            className="p-6 bg-gray-50 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
          >
            <Search className="text-orange-500 w-8 h-8 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Smart Search</h3>
            <p className="text-gray-700">
              Quickly find the records you need with our advanced search and
              filtering options.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8 text-teal-700">
            What Our Users Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <motion.div
              className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
              variants={fadeIn}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <p className="text-gray-700 italic mb-4">
                "MediVault has simplified how I manage my family's medical
                records. It's secure, easy to use, and incredibly convenient."
              </p>
              <h4 className="text-xl font-semibold text-teal-600">
                Jane Smith
              </h4>
              <p className="text-gray-500">Mother of Two</p>
            </motion.div>

            {/* Testimonial 2 */}
            <motion.div
              className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
              variants={fadeIn}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <p className="text-gray-700 italic mb-4">
                "I love the peace of mind knowing my medical documents are
                secure and easily accessible whenever I need them. Great app!"
              </p>
              <h4 className="text-xl font-semibold text-teal-600">
                David Johnson
              </h4>
              <p className="text-gray-500">Tech Professional</p>
            </motion.div>

            {/* Testimonial 3 */}
            <motion.div
              className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
              variants={fadeIn}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <p className="text-gray-700 italic mb-4">
                "The search feature is a lifesaver! I can quickly find any
                record I need without wasting time digging through files."
              </p>
              <h4 className="text-xl font-semibold text-teal-600">
                Emily White
              </h4>
              <p className="text-gray-500">Healthcare Worker</p>
            </motion.div>
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
