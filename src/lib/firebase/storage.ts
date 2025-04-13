// src/lib/firebase/storage.ts
import {getStorage, ref, uploadBytes, getDownloadURL} from "firebase/storage";
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

const storage = getStorage();

export const uploadFile = async (file: File): Promise<string> => {
  try {
    const storageRef = ref(storage, `medical-records/${file.name}`);
    const snapshot = await uploadBytes(storageRef, file);
    return await getDownloadURL(snapshot.ref);
  } catch (error: any) {
    console.error("Error uploading file:", error.message);
    throw new Error(`Failed to upload file: ${error.message}`);
  }
};
