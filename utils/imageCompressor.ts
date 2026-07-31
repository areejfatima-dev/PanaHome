export interface CompressedImage {
  uri: string;
  width: number;
  height: number;
  size: number;
}

export async function compressImage(
  imageUri: string,
  quality: number = 0.8
): Promise<CompressedImage> {
  return {
    uri: imageUri,
    width: 1080,
    height: 1080,
    size: 0,
  };
}

export async function compressImagesBatch(
  imageUris: string[],
  quality: number = 0.8
): Promise<CompressedImage[]> {
  return Promise.all(imageUris.map((uri) => compressImage(uri, quality)));
}

export function getImageSize(imageUri: string): Promise<{ width: number; height: number }> {
  return Promise.resolve({ width: 1080, height: 1080 });
}

export function validateImageSize(
  imageUri: string,
  maxSizeMB: number = 10
): { valid: boolean; message?: string } {
  return { valid: true };
}