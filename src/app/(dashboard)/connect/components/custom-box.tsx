"use client";

import { useState, useRef } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { InputFile } from "@/components/ui/input-file";
import { MagicCard } from "@/components/ui/magic-card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { uploadCSV } from "@/lib/actions/csv";
import { Info } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

// Initial state for form
const initialState = {
  success: false,
  message: "",
};

const CustomConnectBox = () => {
  const [state, formAction] = useFormState(uploadCSV, initialState);
  const [file, setFile] = useState<File | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Handle file change and validation
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      console.log("File Selected:", selectedFile);
      // Validate file extension
      if (!selectedFile.name.toLowerCase().endsWith(".csv")) {
        toast("Invalid File Type", {
          description: "Please select a CSV file.",
        });
        return;
      }
      setFile(selectedFile);
    }
  };

  // Custom form submission handler
  const handleSubmit = (formData: FormData) => {
    // Manually append the file to the FormData
    if (file) {
      formData.append("file", file, file.name);
    }

    console.log("Form Data:", Object.fromEntries(formData.entries()));
    formAction(formData);
  };

  // Show toast based on upload state
  if (state.message) {
    toast(state.success ? "Success" : "Error", {
      description: state.message,
    });
  }

  return (
    <form ref={formRef} action={handleSubmit} className="w-full">
      <MagicCard className="flex flex-col justify-center items-center w-full aspect-video p-6 space-y-4">
        <div className="w-full max-w-sm">
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="picture">Select CSV File</Label>
            <Input ref={fileInputRef} id="picture" type="file" onChange={handleFileChange} accept=".csv" />
          </div>
        </div>

        <div className="w-full max-w-md bg-muted/50 rounded-lg p-4 space-y-3">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Info className="w-5 h-5" />
            <h3 className="font-semibold">CSV Format Requirements</h3>
          </div>

          <div className="border-l-4 border-primary/50 pl-3 py-2 bg-background rounded-r-md">
            <ol className="list-decimal list-inside text-sm space-y-1">
              <li>
                First column must be named <code className="bg-muted px-1 rounded">posts</code>
              </li>
              <li>Each row represents a single post/review</li>
              <li>Text should be clear and concise</li>
            </ol>
          </div>

          <div className="bg-background border rounded-md p-3">
            <h4 className="text-xs font-medium mb-2 text-muted-foreground">Example CSV Content:</h4>
            <pre className="text-xs bg-muted/50 p-2 rounded overflow-x-auto">
              {`posts
This product is very good I use it a lot and recommend it to everyone
I don't like this product and no one should buy this
I haven't bought this product but I've heard good things about it
I don't know about the product`}
            </pre>
          </div>
        </div>

        <SubmitButton file={file} />
      </MagicCard>
    </form>
  );
};

// Separate submit button component to use useFormStatus
const SubmitButton = ({ file }: { file: File | null }) => {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={!file || pending} className="w-full">
      {pending ? "Uploading..." : "Upload CSV"}
    </Button>
  );
};

export default CustomConnectBox;
