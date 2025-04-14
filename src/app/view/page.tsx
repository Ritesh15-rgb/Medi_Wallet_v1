import {useState, useEffect} from "react";
import {getFirestore, collection, getDocs, query, orderBy} from "firebase/firestore";
import {initializeApp} from "firebase/app";
import {firebaseConfig} from "@/lib/firebase/config";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {format} from 'date-fns';

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
                  Uploaded on: {formatDate(record.date)}
                </CardDescription>
              </CardHeader>
              <CardContent className="p-4">
                <p>Doctor: {record.doctorName}</p>
                <p>Report Type: {record.reportType}</p>
                <p>Location: {record.location}</p>
                <a href={record.fileUrl} target="_blank" rel="noopener noreferrer"
                   className="text-blue-500 hover:underline">
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
