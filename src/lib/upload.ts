import { put } from "@vercel/blob";

export async function uploadFile(file: File | null): Promise<string | null> {
  if (!file || file.size === 0) return null;

  // Upload to Vercel Blob
  const { url } = await put(file.name, file, {
    access: 'public',
  });

  return url;
}