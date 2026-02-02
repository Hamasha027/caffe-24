import { writeFile, mkdir } from "fs/promises";
import { join } from "path";
import { NextRequest, NextResponse } from "next/server";
import { put } from "@vercel/blob";
import crypto from "crypto";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // Validate file type
    const validTypes = ["image/jpeg", "image/png", "image/gif", "image/webp", "image/svg+xml"];
    if (!validTypes.includes(file.type)) {
      return NextResponse.json(
        { error: "Invalid file type. Please upload an image (JPEG, PNG, GIF, WebP, or SVG)" },
        { status: 400 }
      );
    }

    // Validate file size (max 5MB)
    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: "File too large. Maximum size is 5MB" },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Generate unique filename
    const ext = file.name.includes(".") ? file.name.split(".").pop() : "bin";
    const safeExt = (ext || "bin").toLowerCase().replace(/[^a-z0-9]/g, "");
    const filename = `${crypto.randomUUID()}.${safeExt || "bin"}`;

    // On Vercel, the filesystem is ephemeral. Prefer Vercel Blob for persistence.
    const hasBlobToken = !!process.env.BLOB_READ_WRITE_TOKEN;
    const isVercel = process.env.VERCEL === "1";

    if (isVercel || hasBlobToken) {
      if (!hasBlobToken) {
        return NextResponse.json(
          { error: "Missing BLOB_READ_WRITE_TOKEN. Configure Vercel Blob to enable uploads." },
          { status: 500 }
        );
      }

      const blob = await put(`uploads/${filename}`, buffer, {
        access: "public",
        contentType: file.type,
        addRandomSuffix: false,
      });

      return NextResponse.json({ success: true, imageUrl: blob.url });
    }

    // Local dev fallback: write to /public/uploads
    try {
      const uploadsDir = join(process.cwd(), "public", "uploads");
      await mkdir(uploadsDir, { recursive: true });
      const filepath = join(uploadsDir, filename);
      await writeFile(filepath, buffer);

      const imageUrl = `/uploads/${filename}`;
      return NextResponse.json({ success: true, imageUrl });
    } catch (fsError) {
      console.error("Filesystem error:", fsError);
      return NextResponse.json(
        { error: "Failed to save image locally. Please ensure /public/uploads directory exists." },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to upload image" },
      { status: 500 }
    );
  }
}
