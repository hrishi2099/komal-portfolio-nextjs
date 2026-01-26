import { writeFile } from "fs/promises";
import { join } from "path";

export async function uploadFile(file: File | null): Promise<string | null> {
  if (!file || file.size === 0) return null;

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  // Create a unique filename
  const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
  const filename = file.name.replace(/\.[^/.]+$/, "") + "-" + uniqueSuffix + "." + file.name.split(".").pop();
  
  // Save to public/uploads
  const path = join(process.cwd(), "public/uploads", filename);
  await writeFile(path, buffer);

  return `/uploads/${filename}`;
}
