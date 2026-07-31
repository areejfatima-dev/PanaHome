import { useState, useCallback } from 'react';

export interface ARCameraState {
  isCameraReady: boolean;
  isFlashEnabled: boolean;
  cameraPosition: 'back' | 'front';
  zoomLevel: number;
}

export function useARCamera() {
  const [state, setState] = useState<ARCameraState>({
    isCameraReady: false,
    isFlashEnabled: false,
    cameraPosition: 'back',
    zoomLevel: 1,
  });

  const onCameraReady = useCallback(() => {
    setState((prev) => ({ ...prev, isCameraReady: true }));
  }, []);

  const toggleFlash = useCallback(() => {
    setState((prev) => ({ ...prev, isFlashEnabled: !prev.isFlashEnabled }));
  }, []);

  const switchCamera = useCallback(() => {
    setState((prev) => ({
      ...prev,
      cameraPosition: prev.cameraPosition === 'back' ? 'front' : 'back',
    }));
  }, []);

  const setZoom = useCallback((level: number) => {
    setState((prev) => ({ ...prev, zoomLevel: Math.max(1, Math.min(level, 10)) }));
  }, []);

  return {
    ...state,
    onCameraReady,
    toggleFlash,
    switchCamera,
    setZoom,
  };
}