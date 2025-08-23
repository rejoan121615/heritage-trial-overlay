import { NextRequest, NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";
import type { CloudinaryUploadResponseTYPE } from "@/types/AllTypes";

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

    const buffer = Buffer.from(await (file as File).arrayBuffer());

    const result = await new Promise<any>((resolve, reject) => {
      const heritageTransformation = [
        {
          aspect_ratio: "2.0",
          crop: "fill",
          width: "1000",
          height: "500",
        },
        {
          quality: "auto",
          fetch_format: "auto",
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

      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: `users/${userId?.toString()}/${folderName?.toString()}`,
          transformation:
            folderName?.toString() === "heritages"
              ? heritageTransformation
              : userTransformation,
        },
        (error, result) => {
          if (error) return reject(error);
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
  } catch (err: any) {
    console.error(err);
    const res: CloudinaryUploadResponseTYPE = {
      success: false,
      imageUrl: null,
      publicId: null,
      error: err.message,
    };
    return NextResponse.json(res, { status: 500 });
  }
}
