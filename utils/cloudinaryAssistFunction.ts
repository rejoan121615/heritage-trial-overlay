import { CloudinaryUploadResponseTYPE } from "@/types/AllTypes";

export const uploadToCloudinary = async (file: File, folder: 'heritages' | 'users'): Promise<CloudinaryUploadResponseTYPE> => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("folder", folder);

  try {
    const response = await fetch("/api/cloudinary/upload", {
      method: "POST",
      body: formData,
    });


    if (!response.ok) {
      const errorData = await response.json();
     
      return {
        success: false,
        imageUrl: null,
        error: "Failed to upload image",
      }
    }

    const {success, imageUrl} : CloudinaryUploadResponseTYPE = await response.json();

    return {
      success: true,
      imageUrl
    };
  } catch (err: any) {
    return {
      success: false,
      imageUrl: null,
      error: err.message || "Failed to upload image",
    };
  }
};
