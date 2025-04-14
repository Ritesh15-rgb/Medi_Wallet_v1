'use client';
// src/lib/firebase/storage.ts
import {getStorage, ref, uploadBytes, getDownloadURL} from "firebase/storage";
import {initializeApp, getApps} from "firebase/app";
import {firebaseConfig} from "@/lib/firebase/config";

let storage;

const initializeFirebase = () => {
  try {
    if (!getApps().length) {
      initializeApp(firebaseConfig);
    }
    storage = getStorage();
  } catch (e: any) {
    if (e.code !== 'app/duplicate-app') {
      console.error('Firebase initialization error', e.message);
    }
  }
};

initializeFirebase();

export const uploadFile = async (file: File): Promise<string> => {
    if (!firebaseConfig.storageBucket) {
        console.error("Error uploading file: No default bucket found. Did you set the 'storageBucket' property when initializing the app?");
        throw new Error("Firebase Storage: No default bucket found.");
    }

    try {
        if (!storage) {
          initializeFirebase();
          if (!storage) {
            console.error("Error uploading file: Firebase Storage not initialized.");
            throw new Error("Firebase Storage not initialized.");
          }
        }
        const storageRef = ref(storage, `medical-records/${file.name}`);
        const snapshot = await uploadBytes(storageRef, file);
        return await getDownloadURL(snapshot.ref);
    } catch (error: any) {
        console.error("Error uploading file:", error.message);
        throw new Error(`Failed to upload file: ${error.message}`);
    }
};

