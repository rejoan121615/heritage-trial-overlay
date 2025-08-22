import { NextRequest, NextResponse } from "next/server"
import cloudinary from "@/lib/cloudinary"
import type { CloudinaryDeleteResponseTYPE } from "@/types/AllTypes"

export async function POST(req: NextRequest) {
  try {
    const { public_id } = await req.json()

    if (!public_id) {
      const res: CloudinaryDeleteResponseTYPE = {
        success: false,
        error: "No public_id"
      }
      return NextResponse.json(res, { status: 400 })
    }

    let cloudinaryResponse = await cloudinary.uploader.destroy(public_id);
    console.log('---------', cloudinaryResponse);

    const res: CloudinaryDeleteResponseTYPE = {
      success: true
    }
    return NextResponse.json(res)
  } catch (err: any) {
    console.error(err)
    const res: CloudinaryDeleteResponseTYPE = {
      success: false,
      error: err.message
    }
    return NextResponse.json(res, { status: 500 })
  }
}
