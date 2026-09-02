import { useLocalSearchParams } from 'expo-router';
import CameraView from '@/components/ar/CameraView';

export default function ArCapture() {
  const { propertyId, floorId, roomId, roomName, floorName } = useLocalSearchParams<{
    propertyId: string;
    floorId: string;
    roomId: string;
    roomName: string;
    floorName: string;
  }>();

  return (
    <CameraView
      propertyId={propertyId || ''}
      floorId={floorId || ''}
      roomId={roomId || ''}
      roomName={roomName || 'Room'}
      floorName={floorName || ''}
    />
  );
}
