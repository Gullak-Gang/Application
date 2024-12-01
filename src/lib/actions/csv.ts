"use server";

import { auth } from "@clerk/nextjs/server";

export async function uploadCSV(_: any, formData: FormData) {
  console.log("Server Action Called - uploadCSV");
  console.log("Form Data Keys:", Array.from(formData.keys()));

  // Get the authenticated user
  const { userId } = await auth();

  // Log user authentication status
  console.log("User ID:", userId);

  // Check if user is authenticated
  if (!userId) {
    console.error("Authentication Error: No user ID found");
    return {
      success: false,
      message: "User not authenticated",
    };
  }

  const file = formData.get("file");

  // Log file details
  console.log("File Object:", file);
  console.log("File Type:", file instanceof File);
  console.log("File Name:", file instanceof File ? file.name : "Not a File");

  // Basic file validation
  if (!(file instanceof File)) {
    console.error("Validation Error: No file selected");
    return {
      success: false,
      message: "No file selected",
    };
  }

  try {
    // Create a new FormData to send the file
    const uploadFormData = new FormData();
    uploadFormData.append("files", file, "custom_csv");
    uploadFormData.append("user_id", userId);

    console.log("Attempting to upload file");

    // Perform the fetch request
    const response = await fetch("https://kestra.bakaotaku.dev/api/v1/executions/hackfrost/custom_csv", {
      method: "POST",
      body: uploadFormData,
    });

    console.log("Upload Response Status:", response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Upload Error:", errorText);
      throw new Error("Upload failed");
    }

    return {
      success: true,
      message: "File uploaded successfully",
    };
  } catch (error) {
    console.error("Catch Block Error:", error);
    return {
      success: false,
      message: error instanceof Error ? error.message : "Failed to upload file",
    };
  }
}
