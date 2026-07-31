import * as Speech from 'expo-speech';

export interface VoiceSearchResult {
  query: string;
  confidence: number;
  isComplete: boolean;
}

export function speak(text: string): void {
  Speech.speak(text, { language: 'en' });
}

export function stopSpeaking(): void {
  Speech.stop();
}

export async function startVoiceSearch(): Promise<VoiceSearchResult> {
  return {
    query: '',
    confidence: 0,
    isComplete: false,
  };
}

export function processVoiceCommand(command: string): VoiceSearchResult {
  return {
    query: command,
    confidence: 0.9,
    isComplete: true,
  };
}