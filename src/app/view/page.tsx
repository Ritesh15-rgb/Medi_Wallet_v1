"use client";

import {useState, useEffect} from "react";
import {getFirestore, collection, getDocs} from "firebase/firestore";
import {initializeApp} from "firebase/app";
import {firebaseConfig} from "@/lib/firebase/config";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";

// Initialize Firebase if not already initialized
try {
  initializeApp(firebaseConfig);
} catch (e: any) {
  if (e.code !== 'app/duplicate-app') {
    console.error('Firebase initialization error', e.message);
  }
}

const db = getFirestore();

interface Record {
  doctorName: string;
  reportType: string;
  fileUrl: string;
  fileName: string;
  timestamp: any; // Firebase Timestamp
  location: string; // Location of the record
}

export default function View() {
  const [records, setRecords] = useState<Record[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecords = async () => {
      setLoading(true);
      try {
        const querySnapshot = await getDocs(collection(db, "medicalRecords"));
        const recordsData: Record[] = querySnapshot.docs.map(doc => {
          const data = doc.data() as Record;
          return {
            ...data,
            timestamp: data.timestamp, // Keep the Firebase Timestamp object
            location: data.location || 'N/A', // Provide a default value if location is missing
          };
        });
        setRecords(recordsData);
      } catch (error: any) {
        console.error("Error fetching records:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRecords();
  }, []);

  const formatDate = (timestamp: any) => {
    if (!timestamp) return 'N/A';

    try {
      const date = timestamp.toDate(); // Convert Firebase Timestamp to JavaScript Date object
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
      });
    } catch (e) {
      console.error("Error formatting date", e);
      return 'Invalid Date';
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-secondary">
        <p className="text-gray-700">Loading records...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-secondary p-4">
      <h1 className="text-3xl font-bold text-primary mb-4">View Records</h1>
      {records.length > 0 ? (
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {records.map((record, index) => (
            <Card key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-primary">{record.fileName}</CardTitle>
                <CardDescription>
                  Uploaded on: {formatDate(record.timestamp)}
                </CardDescription>
              </CardHeader>
              <CardContent className="p-4">
                <p>Doctor: {record.doctorName}</p>
                <p>Report Type: {record.reportType}</p>
                <p>Location: {record.location}</p> {/* Display the location */}
                <a href={record.fileUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                  View File
                </a>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <p className="text-gray-700">No records found.</p>
      )}
    </div>
  );
}
