import z from "zod";

export const categoryOptions = [
  "ruins",
  "monastery",
  "palace",
  "mosque",
  "historic town",
  "temple",
  "museum",
  "church",
  "architecture",
  "residence",
];


export const HeritageSchema = z.object({
  title: z.string().nonempty("Title is required."),
  summary: z.string().nonempty("Summary is required."),
  location: z.string().nonempty("Location is required."),
  category: z.enum(categoryOptions, {
    message: "Please select a valid category",
  }),
  image: z
    .instanceof(File, { message: "Please upload a file" })
    .refine((file) => file.size <= 10 * 1024 * 1024, {
      message: "File size must be less than 10MB",
    })
    .refine((file) => file.type.startsWith("image/"), {
      message: "Only image files are allowed",
    }),
});


  export const uploadToCloudinary = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "heritage_uploads"); // Create this preset in Cloudinary dashboard
    formData.append("folder", "heritage-sites"); // Optional: organize images in folders

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error?.message || "Upload failed");
    }

    const data = await response.json();
    return data.secure_url; // Return the image URL
  };

