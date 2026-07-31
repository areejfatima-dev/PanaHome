export interface BlurDetectionResult {
  isBlurred: boolean;
  blurScore: number;
  confidence: number;
}

export function detectBlur(imageUri: string): BlurDetectionResult {
  return {
    isBlurred: false,
    blurScore: 0,
    confidence: 0,
  };
}

export function detectBlurBatch(imageUris: string[]): BlurDetectionResult[] {
  return imageUris.map(() => ({
    isBlurred: false,
    blurScore: 0,
    confidence: 0,
  }));
}

export function validateImageQuality(imageUri: string): {
  isAcceptable: boolean;
  issues: string[];
} {
  return {
    isAcceptable: true,
    issues: [],
  };
}