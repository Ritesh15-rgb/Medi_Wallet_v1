'use client';

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
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {Textarea} from "@/components/ui/textarea";
import {FormField, FormItem, FormLabel, FormControl, FormMessage, Form} from "@/components/ui/form";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";

const formSchema = z.object({
  doctorName: z.string().min(2, {
    message: "Doctor's name must be at least 2 characters.",
  }),
  reportType: z.string().min(1, {
    message: "Report type must be selected.",
  }),
  customReportType: z.string().optional(),
  location: z.string().min(2, {
    message: "Location must be at least 2 characters.",
  }),
  date: z.date({
    required_error: "A date of upload is required.",
  }),
  notes: z.string().optional(),
  gender: z.string().optional(),
  contactNumber: z.string().optional(),
});

export default function Upload() {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setLoading] = useState(false);
  const {toast} = useToast();
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      doctorName: "",
      reportType: "",
      customReportType: "",
      location: "",
      date: new Date(),
      notes: "",
      gender: "",
      contactNumber: "",
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    } else {
      setFile(null);
    }
  };

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    setLoading(true);

    try {
      let downloadURL = "";
      let fileName = "";

      if (file) {
        downloadURL = await uploadFile(file);
        fileName = file.name;
      }

      const reportType = values.reportType === 'Other' ? values.customReportType : values.reportType;

      await saveRecordMetadata({
        doctorName: values.doctorName,
        reportType: reportType || 'N/A',
        fileUrl: downloadURL,
        fileName: fileName,
        location: values.location,
        date: values.date,
        notes: values.notes,
        gender: values.gender || 'N/A',
        contactNumber: values.contactNumber,
      });

      toast({
        title: "Success",
        description: "Record saved successfully!",
      });

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
    <div className="flex flex-col items-center justify-center min-h-screen bg-secondary p-4">
      <Card className="w-full max-w-md md:max-w-lg bg-white rounded-lg shadow-md overflow-hidden">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-primary">Upload Medical Record</CardTitle>
          <CardDescription>Store your medical records securely.</CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="doctorName"
                render={({field}) => (
                  <FormItem>
                    <FormLabel>Doctor's Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Dr. John Doe" {...field} />
                    </FormControl>
                    <FormMessage/>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="reportType"
                render={({field}) => (
                  <FormItem>
                    <FormLabel>Report Type</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a report type"/>
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Prescription">Prescription</SelectItem>
                        <SelectItem value="Lab Report">Lab Report</SelectItem>
                        <SelectItem value="Radiology Report">Radiology Report</SelectItem>
                        <SelectItem value="Discharge Summary">Discharge Summary</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage/>
                  </FormItem>
                )}
              />
              {form.watch("reportType") === "Other" && (
                <FormField
                  control={form.control}
                  name="customReportType"
                  render={({field}) => (
                    <FormItem>
                      <FormLabel>Custom Report Type</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter report type" {...field} />
                      </FormControl>
                      <FormMessage/>
                    </FormItem>
                  )}
                />
              )}
              <FormField
                control={form.control}
                name="location"
                render={({field}) => (
                  <FormItem>
                    <FormLabel>Location</FormLabel>
                    <FormControl>
                      <Input placeholder="Hospital/Clinic Name" {...field} />
                    </FormControl>
                    <FormMessage/>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="date"
                render={({field}) => (
                  <FormItem>
                    <FormLabel>Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-[240px] pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50"/>
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) => date > new Date()}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage/>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="notes"
                render={({field}) => (
                  <FormItem>
                    <FormLabel>Additional Notes</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Enter any additional notes"
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage/>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="gender"
                render={({field}) => (
                  <FormItem>
                    <FormLabel>Gender</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select gender"/>
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Male">Male</SelectItem>
                        <SelectItem value="Female">Female</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage/>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="contactNumber"
                render={({field}) => (
                  <FormItem>
                    <FormLabel>Contact Number</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter contact number" {...field} />
                    </FormControl>
                    <FormMessage/>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="file"
                render={() => (
                  <FormItem>
                    <FormLabel>Select File (Optional)</FormLabel>
                    <FormControl>
                      <Input
                        type="file"
                        onChange={handleFileChange}
                      />
                    </FormControl>
                    <FormMessage/>
                    {file &&
                      <p>Selected file: {file.name}</p>}
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={uploading}>
                {uploading ? "Saving..." : "Save"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}

