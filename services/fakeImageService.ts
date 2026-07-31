import axios from 'axios';

const API_BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL || '';

export interface FakeImageDetectionResult {
  isFake: boolean;
  confidence: number;
  reasons: string[];
}

export async function detectFakeImage(imageUri: string): Promise<FakeImageDetectionResult> {
  try {
    const response = await axios.post(`${API_BASE_URL}/image/verify`, {
      imageUri,
    });
    return response.data;
  } catch (error) {
    console.error('Fake image detection error:', error);
    throw error;
  }
}

export async function detectFakeImagesBatch(
  imageUris: string[]
): Promise<FakeImageDetectionResult[]> {
  return Promise.all(imageUris.map((uri) => detectFakeImage(uri)));
}