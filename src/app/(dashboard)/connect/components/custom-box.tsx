"use client";

import AnimatedShinyText from "@/components/ui/animated-shiny-text";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { MagicCard } from "@/components/ui/magic-card";
import { uploadCSV } from "@/lib/actions/csv";
import { Info } from "lucide-react";
import { useRef, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { toast } from "sonner";

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

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      if (!selectedFile.name.toLowerCase().endsWith(".csv")) {
        toast("Invalid File Type", {
          description: "Please select a CSV file.",
        });
        return;
      }
      setFile(selectedFile);
    }
  };

  const handleSubmit = (formData: FormData) => {
    if (file) {
      formData.append("file", file, file.name);
    }
    formAction(formData);
  };

  if (state.message) {
    toast(state.success ? "Success" : "Error", {
      description: state.message,
    });
  }

  return (
    <MagicCard className="flex flex-col justify-center items-center w-full min-h-80 p-6 space-y-4">
      <Card className="p-4">
        <CardContent>
          <form ref={formRef} action={handleSubmit} className="space-y-4 max-w-md">
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <AnimatedShinyText className="font-semibold text-lg text-center">Upload File</AnimatedShinyText>
              <Input
                ref={fileInputRef}
                id="picture"
                type="file"
                onChange={handleFileChange}
                accept=".csv"
                placeholder="Select CSV File"
              />
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
                  {`
This product is very good I use it a lot and recommend it to everyone
I don't like this product and no one should buy this
I haven't bought this product but I've heard good things about it
I don't know about the product`}
                </pre>
              </div>
            </div>
            <SubmitButton file={file} />
          </form>
        </CardContent>
      </Card>
    </MagicCard>
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
