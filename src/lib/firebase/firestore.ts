"use client";
// src/lib/firebase/firestore.ts
import {getFirestore, collection, addDoc, serverTimestamp} from "firebase/firestore";
import {initializeApp} from "firebase/app";
import {firebaseConfig} from "@/lib/firebase/config";

// Initialize Firebase if not already initialized
try {
  initializeApp(firebaseConfig);
} catch (e: any) {
  if (e.code !== 'app/duplicate-app') {
    console.error('Firebase initialization error', e.message);
  }
}

const db = getFirestore();

interface RecordMetadata {
  doctorName: string;
  reportType: string;
  fileUrl: string;
  fileName: string;
  location: string;
  date: Date | undefined;
  notes: string; // Added notes field
  gender: string;
  contactNumber: string;
}

export const saveRecordMetadata = async (metadata: RecordMetadata): Promise<void> => {
    await addDoc(collection(db, "medicalRecords"), {
      ...metadata,
      timestamp: serverTimestamp(), // Add server timestamp
    });
};
