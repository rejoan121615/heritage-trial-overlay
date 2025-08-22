import { NextRequest, NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";
import type { CloudinaryUploadResponseTYPE } from "@/types/AllTypes";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file");
    const folderName = formData.get("folder");

    const folder =
      typeof folderName === "string" && folderName.length > 0
        ? folderName
        : "heritages";

    if (!file || typeof file === "string") {
      const res: CloudinaryUploadResponseTYPE = {
        success: false,
        imageUrl: null,
        error: "No file provided",
      };
      return NextResponse.json(res, { status: 400 });
    }

    const buffer = Buffer.from(await (file as File).arrayBuffer());

    const result = await new Promise<any>((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder,
          transformation: [
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
          ],
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
    };

    return NextResponse.json(res);
  } catch (err: any) {
    console.error(err);
    const res: CloudinaryUploadResponseTYPE = {
      success: false,
      imageUrl: null,
      error: err.message,
    };
    return NextResponse.json(res, { status: 500 });
  }
}
