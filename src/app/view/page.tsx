"use client";

import {useState, useEffect} from "react";
import {getFirestore, collection, getDocs, query, orderBy} from "firebase/firestore";
import {initializeApp} from "firebase/app";
import {firebaseConfig} from "@/lib/firebase/config";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {format} from 'date-fns';
import {motion} from 'framer-motion';

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
  date: any;
  location: string;
}

const cardVariants = {
  hidden: {opacity: 0, y: 50},
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 260,
      damping: 20,
    },
  },
};

export default function View() {
  const [records, setRecords] = useState<Record[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecords = async () => {
      setLoading(true);
      try {
        const q = query(collection(db, "medicalRecords"), orderBy("date", "desc"));
        const querySnapshot = await getDocs(q);
        const recordsData: Record[] = querySnapshot.docs.map(doc => {
          const data = doc.data() as Record;
          return {
            ...data,
            date: data.date ? data.date.toDate() : null,
            location: data.location || 'N/A',
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

  const formatDate = (date: Date | null) => {
    if (!date) return 'N/A';
    return format(date, 'PPP hh:mm a');
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-teal-100 to-blue-100">
        <p className="text-gray-700">Loading records...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-teal-100 to-blue-100 p-4">
      <motion.h1
        className="text-3xl font-bold text-teal-700 mb-4"
        initial={{opacity: 0, y: -50}}
        animate={{opacity: 1, y: 0}}
        transition={{duration: 0.7}}
      >
        View Records
      </motion.h1>
      {records.length > 0 ? (
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {records.map((record, index) => (
            <motion.div key={index} variants={cardVariants} initial="hidden" animate="visible">
              <Card className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-teal-600">{record.fileName}</CardTitle>
                  <CardDescription>
                    Uploaded on: {formatDate(record.date)}
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <p className="text-gray-700">Doctor: {record.doctorName}</p>
                  <p className="text-gray-700">Report Type: {record.reportType}</p>
                  <p className="text-gray-700">Location: {record.location}</p>
                  <a href={record.fileUrl} target="_blank" rel="noopener noreferrer"
                     className="text-blue-500 hover:underline">
                    View File
                  </a>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      ) : (
        <p className="text-gray-700">No records found.</p>
      )}
    </div>
  );
}
