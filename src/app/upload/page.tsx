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
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-secondary">
      <Card className="w-full max-w-md rounded-xl shadow-md overflow-hidden">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold text-primary">Upload Medical Record</CardTitle>
          <CardDescription className="text-gray-600">
            Store your medical records securely.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-8">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="flex flex-col space-y-6">
              <FormField
                control={form.control}
                name="doctorName"
                render={({field}) => (
                  <FormItem>
                    <FormLabel>Doctor's Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter doctor's name" {...field} />
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
                          <SelectValue placeholder="Select report type"/>
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
                        <Input placeholder="Enter custom report type" {...field} />
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
                      <Input placeholder="Enter location" {...field} />
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
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4"/>
                          {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="center" side="bottom">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date > new Date()
                          }
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
              <div>
                <label htmlFor="file" className="block text-gray-700 text-sm font-bold mb-2">
                  Select File (Optional)
                </label>
                <Input type="file" id="file" onChange={handleFileChange}/>
                {file && <p className="text-gray-500 text-sm mt-1">Selected file: {file.name}</p>}
              </div>
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
