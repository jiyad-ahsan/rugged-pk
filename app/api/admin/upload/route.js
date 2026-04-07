import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_ANON_KEY;
const BUCKET = "product-images";

export async function POST(req) {
  const session = await auth();
  if (!session?.user?.id || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const formData = await req.formData();
  const file = formData.get("file");

  if (!file || typeof file === "string") {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }

  // Validate file type
  const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/avif"];
  if (!allowedTypes.includes(file.type)) {
    return NextResponse.json({ error: "Only JPEG, PNG, WebP, and AVIF images are allowed" }, { status: 400 });
  }

  // Max 5MB
  if (file.size > 5 * 1024 * 1024) {
    return NextResponse.json({ error: "File must be under 5MB" }, { status: 400 });
  }

  // Generate unique filename
  const ext = file.name.split(".").pop()?.toLowerCase() || "jpg";
  const filename = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
  const path = `products/${filename}`;

  // Upload to Supabase Storage
  const uploadRes = await fetch(
    `${SUPABASE_URL}/storage/v1/object/${BUCKET}/${path}`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${SUPABASE_KEY}`,
        "Content-Type": file.type,
        "x-upsert": "true",
      },
      body: file,
    }
  );

  if (!uploadRes.ok) {
    const err = await uploadRes.text();
    console.error("Supabase upload error:", err);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }

  // Public URL
  const publicUrl = `${SUPABASE_URL}/storage/v1/object/public/${BUCKET}/${path}`;

  return NextResponse.json({ url: publicUrl });
}

export async function DELETE(req) {
  const session = await auth();
  if (!session?.user?.id || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { path } = await req.json();
  if (!path) {
    return NextResponse.json({ error: "No path provided" }, { status: 400 });
  }

  // Extract storage path from full URL
  const prefix = `${SUPABASE_URL}/storage/v1/object/public/${BUCKET}/`;
  const storagePath = path.startsWith(prefix) ? path.slice(prefix.length) : path;

  const deleteRes = await fetch(
    `${SUPABASE_URL}/storage/v1/object/${BUCKET}/${storagePath}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${SUPABASE_KEY}`,
      },
    }
  );

  if (!deleteRes.ok) {
    const err = await deleteRes.text();
    console.error("Supabase delete error:", err);
    return NextResponse.json({ error: "Delete failed" }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
