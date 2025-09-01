import { NextRequest, NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";
import type { CloudinaryUploadResponseTYPE } from "@/types/AllTypes";
import { UploadApiResponse, UploadApiErrorResponse } from "cloudinary";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file");
    const folderName = formData.get("folder");
    const userId = formData.get("userId");

    if (!file || typeof file === "string") {
      const res: CloudinaryUploadResponseTYPE = {
        success: false,
        imageUrl: null,
        publicId: null,
        error: "No file provided",
      };
      return NextResponse.json(res, { status: 400 });
    }

    // image upload configration based on folder 
    const heritageTransformation = [
      {
        width: 1000,
        height: 500,
        crop: "pad",
        background: "transparent",
        fetch_format: "webp",
      },
      {
        quality: "auto",
      },
    ];

    const userTransformation = [
      {
        width: 300,
        height: 300,
        crop: "fill",
        gravity: "auto",
        quality: "auto",
      },
      {
        quality: "auto",
        fetch_format: "auto",
      },
    ];

    const buffer = Buffer.from(await (file as File).arrayBuffer());

    const result = await new Promise<UploadApiResponse>((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: `users/${userId?.toString()}/${folderName?.toString()}`,
          transformation:
            folderName?.toString() === "heritages"
              ? heritageTransformation
              : userTransformation,
        },
        (
          error: UploadApiErrorResponse | undefined,
          result: UploadApiResponse | undefined
        ) => {
          if (error) {
            console.error("Cloudinary upload error:", error);
            return reject(error);
          }
          if (!result)
            return reject(new Error("Cloudinary returned no result"));

          resolve(result);
        }
      );
      uploadStream.end(buffer);
    });

    const res: CloudinaryUploadResponseTYPE = {
      success: true,
      imageUrl: result.secure_url,
      publicId: result.public_id,
    };

    return NextResponse.json(res);
  } catch (err) {
    console.error(err);
    const res: CloudinaryUploadResponseTYPE = {
      success: false,
      imageUrl: null,
      publicId: null,
      error: "Something went wrong, please try again later.",
    };
    return NextResponse.json(res, { status: 500 });
  }
}
