import {
  CloudinaryDeleteResponseTYPE,
  CloudinaryUploadResponseTYPE,
} from "@/types/AllTypes";

// upload image request handler

export const uploadToCloudinary = async (
  file: File,
  folder: "heritages" | "users",
): Promise<CloudinaryUploadResponseTYPE> => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("folder", folder);

  try {
    const response = await fetch("/api/cloudinary/upload", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      return {
        success: false,
        imageUrl: null,
        publicId: null,
        error: "Failed to upload image",
      };
    }



    const { success, imageUrl, publicId }: CloudinaryUploadResponseTYPE =
      await response.json();

    return {
      success,
      imageUrl,
      publicId,
    };
  } catch (err: any) {
    return {
      success: false,
      imageUrl: null,
      publicId: null,
      error: err.message || "Failed to upload image",
    };
  }
};

// delete image request handler
export const deleteFromCloudinary = async (
  public_id: string
): Promise<CloudinaryDeleteResponseTYPE> => {
  try {
    const response = await fetch("/api/cloudinary/delete", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ public_id }),
    });


    if (!response.ok) {
      const errorData = await response.json();
      return {
        success: false,
        error: errorData.error || "Failed to delete image",
      };
    }

    return (await response.json()) as CloudinaryDeleteResponseTYPE;
  } catch (err: any) {
    return {
      success: false,
      error: err.message || "Failed to delete image",
    };
  }
};
