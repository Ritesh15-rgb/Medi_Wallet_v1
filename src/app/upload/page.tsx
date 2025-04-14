;"use client";

import {useState} from "react";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {uploadFile} from "@/lib/firebase/storage";
import {saveRecordMetadata} from "@/lib/firebase/firestore";
import {useToast} from "@/hooks/use-toast";
import {useRouter} from "next/navigation";
import {Calendar} from "@/components/ui/calendar";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {cn} from "@/lib/utils";
import {format} from "date-fns";
import {CalendarIcon} from "lucide-react";

export default function Upload() {
  const [file, setFile] = useState<File | null>(null);
  const [doctorName, setDoctorName] = useState("");
  const [reportType, setReportType] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [uploading, setLoading] = useState(false);
  const {toast} = useToast();
  const router = useRouter();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    } else {
      setFile(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);

    try {
      let downloadURL = "";
      let fileName = "";

      if (file) {
        // Upload the file to Firebase Storage
        downloadURL = await uploadFile(file);
        fileName = file.name;
      }

      // Save the metadata to Firestore
      await saveRecordMetadata({
        doctorName,
        reportType,
        fileUrl: downloadURL,
        fileName: fileName,
        location: location,
        date: date,
      });

      toast({
        title: "Success",
        description: "Record saved successfully!",
      });

      // Reset the form
      setFile(null);
      setDoctorName("");
      setReportType("");
      setLocation("");
      setDate(undefined);

      // Redirect to the view page
      router.push("/view");

    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to save the record.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-teal-100 to-blue-100 p-4">
      <Card className="w-full max-w-md bg-white rounded-xl shadow-xl overflow-hidden">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold text-teal-700">Upload Medical Record</CardTitle>
          <CardDescription className="text-gray-600">
            Store your medical records securely.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-8">
          <form onSubmit={handleSubmit} className="flex flex-col space-y-6">
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
              <label htmlFor="location" className="block text-gray-700 text-sm font-bold mb-2">
                Location
              </label>
              <Input
                type="text"
                id="location"
                placeholder="Enter location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                required
              />
            </div>

            <div>
              <label htmlFor="date" className="block text-gray-700 text-sm font-bold mb-2">
                Date
              </label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4"/>
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="center" side="bottom">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    disabled={(date) =>
                      date > new Date()
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div>
              <label htmlFor="file" className="block text-gray-700 text-sm font-bold mb-2">
                Select File (Optional)
              </label>
              <Input type="file" id="file" onChange={handleFileChange}/>
              {file && <p className="text-gray-500 text-sm mt-1">Selected file: {file.name}</p>}
            </div>
            <Button type="submit" disabled={uploading} className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded-xl">
              {uploading ? "Saving..." : "Save"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
