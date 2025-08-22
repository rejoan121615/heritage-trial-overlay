import { NextRequest, NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";

export async function POST(req: NextRequest) {
  try {
    const { public_id } = await req.json();

    if (!public_id) return NextResponse.json({ error: "No public_id" }, { status: 400 });

    await cloudinary.uploader.destroy(public_id);

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
