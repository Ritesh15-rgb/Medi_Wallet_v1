"use client";

import {useState, useEffect} from "react";
import {getFirestore, collection, query, where, getDocs, orderBy, or} from "firebase/firestore";
import {initializeApp} from "firebase/app";
import {firebaseConfig} from "@/lib/firebase/config";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
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
  notes: string;
  gender: string;
  contactNumber: string;
}

export default function Search() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<Record[]>([]);
  const [loading, setLoading] = useState(false);
  const [noResults, setNoResults] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setNoResults(false); // Reset noResults state on new search
    try {
      const q = query(
        collection(db, "medicalRecords"),
        or(
          where("doctorName", ">=", searchTerm),
          where("doctorName", "<=", searchTerm + '\uf8ff'),
          where("fileName", ">=", searchTerm),
          where("fileName", "<=", searchTerm + '\uf8ff'),
          where("reportType", ">=", searchTerm),
          where("reportType", "<=", searchTerm + '\uf8ff'),
        ),
        orderBy("doctorName"),
        orderBy("date", "desc")
      );
      const querySnapshot = await getDocs(q);
      const results: Record[] = querySnapshot.docs.map(doc => {
        const data = doc.data() as Record;
        return {
          ...data,
          date: data.date ? data.date.toDate() : null,
          location: data.location || 'N/A',
          notes: data.notes || 'N/A',
          gender: data.gender || 'N/A',
          contactNumber: data.contactNumber || 'N/A',
        };
      });

      if (results.length === 0) {
        setNoResults(true);
      }
      setSearchResults(results);
    } catch (error: any) {
      console.error("Error searching records:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (date: Date | null) => {
    if (!date) return 'N/A';
    return format(date, 'PPP hh:mm a');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-teal-100 to-blue-100 p-4">
      <h1 className="text-3xl font-bold text-teal-700 mb-4">Search Records</h1>
      <form onSubmit={handleSearch} className="flex space-x-2 mb-4">
        <Input
          type="text"
          placeholder="Search by doctor's name, filename, or report type"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Button type="submit" disabled={loading}>
          {loading ? "Searching..." : "Search"}
        </Button>
      </form>
      {loading && <p className="text-gray-700">Searching records...</p>}
      {noResults && !loading && <p className="text-gray-700">No records found matching your search.</p>}
      {searchResults.length > 0 ? (
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {searchResults.map((record, index) => (
            <Card key={index} className="bg-white rounded-xl shadow-md overflow-hidden">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-teal-600">{record.fileName}</CardTitle>
                <CardDescription>
                  Uploaded on: {formatDate(record.date)}
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <p>Doctor: {record.doctorName}</p>
                <p>Report Type: {record.reportType}</p>
                <p>Location: {record.location}</p>
                <p>Notes: {record.notes}</p>
                <p>Gender: {record.gender}</p>
                <p>Contact: {record.contactNumber}</p>
                <a href={record.fileUrl} target="_blank" rel="noopener noreferrer"
                   className="text-blue-500 hover:underline">
                  View File
                </a>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (!loading && !noResults) && (
        <p className="text-gray-700">Enter a search term to find records.</p>
      )}
    </div>
  );
}
