import { useState, useEffect, useCallback } from 'react';

export interface ARState {
  isSessionRunning: boolean;
  isTracking: boolean;
  currentRoom: string | null;
  capturedImages: string[];
}

export function useAR() {
  const [state, setState] = useState<ARState>({
    isSessionRunning: false,
    isTracking: false,
    currentRoom: null,
    capturedImages: [],
  });

  const startSession = useCallback(() => {
    setState((prev) => ({ ...prev, isSessionRunning: true }));
  }, []);

  const stopSession = useCallback(() => {
    setState((prev) => ({ ...prev, isSessionRunning: false, isTracking: false }));
  }, []);

  const setCurrentRoom = useCallback((room: string | null) => {
    setState((prev) => ({ ...prev, currentRoom: room }));
  }, []);

  const addCapturedImage = useCallback((uri: string) => {
    setState((prev) => ({
      ...prev,
      capturedImages: [...prev.capturedImages, uri],
    }));
  }, []);

  const resetCaptures = useCallback(() => {
    setState((prev) => ({ ...prev, capturedImages: [] }));
  }, []);

  useEffect(() => {
    return () => {
      stopSession();
    };
  }, [stopSession]);

  return {
    ...state,
    startSession,
    stopSession,
    setCurrentRoom,
    addCapturedImage,
    resetCaptures,
  };
}