"use client";
// src/lib/firebase/config.ts
// Replace with your actual Firebase configuration

const apiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY ?? undefined;
const authDomain = process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN ?? undefined;
const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ?? undefined;
const storageBucket = process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET ?? undefined;
const messagingSenderId = process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID ?? undefined;
const appId = process.env.NEXT_PUBLIC_FIREBASE_APP_ID ?? undefined;
const measurementId = process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID ?? undefined;

export const firebaseConfig = {
  apiKey: apiKey,
  authDomain: authDomain,
  projectId: projectId,
  storageBucket: storageBucket,
  messagingSenderId: messagingSenderId,
  appId: appId,
  measurementId: measurementId,
};
