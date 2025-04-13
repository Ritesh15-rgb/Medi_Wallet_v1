"use client";

import {useState} from "react";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {uploadFile} from "@/lib/firebase/storage";
import {saveRecordMetadata} from "@/lib/firebase/firestore";
import {useToast} from "@/hooks/use-toast";

export default function Upload() {
  const [file, setFile] = useState<File | null>(null);
  const [doctorName, setDoctorName] = useState("");
  const [reportType, setReportType] = useState("");
  const [uploading, setUploading] = useState(false);
  const {toast} = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!file) {
      toast({
        title: "Error",
        description: "Please select a file to upload.",
        variant: "destructive",
      });
      return;
    }

    setUploading(true);

    try {
      // Upload the file to Firebase Storage
      const downloadURL = await uploadFile(file);

      // Save the metadata to Firestore
      await saveRecordMetadata({
        doctorName,
        reportType,
        fileUrl: downloadURL,
        fileName: file.name,
      });

      toast({
        title: "Success",
        description: "File uploaded successfully!",
      });

      // Reset the form
      setFile(null);
      setDoctorName("");
      setReportType("");
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to upload the file.",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-secondary">
      <Card className="w-full max-w-md bg-white rounded-lg shadow-md overflow-hidden">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-primary">Upload Medical Record</CardTitle>
          <CardDescription className="text-gray-600">
            Store your medical records securely.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
            <div>
              <label htmlFor="doctorName" className="block text-gray-700 text-sm font-bold mb-2">
                Doctor's Name
              </label>
              <Input
                type="text"
                id="doctorName"
                placeholder="Enter doctor's name"
                value={doctorName}
                onChange={(e) => setDoctorName(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="reportType" className="block text-gray-700 text-sm font-bold mb-2">
                Report Type
              </label>
              <Input
                type="text"
                id="reportType"
                placeholder="Enter report type"
                value={reportType}
                onChange={(e) => setReportType(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="file" className="block text-gray-700 text-sm font-bold mb-2">
                Select File
              </label>
              <Input type="file" id="file" onChange={handleFileChange} required/>
              {file && <p className="text-gray-500 text-sm mt-1">Selected file: {file.name}</p>}
            </div>
            <Button type="submit" disabled={uploading}>
              {uploading ? "Uploading..." : "Upload"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
