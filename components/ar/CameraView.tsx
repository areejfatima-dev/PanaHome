import { useEffect, useState, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { CameraView, useCameraPermissions } from 'expo-camera';
import type { CameraView as CameraViewType } from 'expo-camera';

interface CameraViewProps {
  propertyId: string;
  floorId: string;
  roomId: string;
  roomName: string;
  floorName: string;
}

export default function CameraScreen({ propertyId, floorId, roomId, roomName, floorName }: CameraViewProps) {
  const router = useRouter();
  const cameraRef = useRef<CameraViewType>(null);
  const [permission, requestPermission] = useCameraPermissions();
  const [facing, setFacing] = useState<'front' | 'back'>('back');
  const [photos, setPhotos] = useState<string[]>([]);
  const [isCapturing, setIsCapturing] = useState(false);

  async function handleCapture() {
    if (!cameraRef.current || isCapturing) return;

    setIsCapturing(true);
    try {
    const photo = await cameraRef.current.takePictureAsync({
      quality: 0.8,
    });

      if (photo?.uri) {
        setPhotos((prev) => [...prev, photo.uri]);
      }
    } catch (error) {
      console.error('Failed to take photo:', error);
    } finally {
      setIsCapturing(false);
    }
  }

  function handleDone() {
    // TODO: Pass photos back to parent in Step 9
    router.back();
  }

  if (!permission) {
    return (
      <View style={styles.centered}>
        <Text style={styles.white}>Loading...</Text>
      </View>
    );
  }

  if (!permission.granted) {
    return (
      <View style={styles.centered}>
        <MaterialIcons name="camera-alt" size={48} color="#fff" />
        <Text style={styles.permTitle}>Camera Permission Required</Text>
        <Text style={styles.permSubtitle}>
          Please allow camera access to use this feature.
        </Text>
        <TouchableOpacity onPress={requestPermission} style={styles.permBtn}>
          <Text style={styles.permBtnText}>Grant Permission</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.back()} style={{ marginTop: 12 }}>
          <Text style={{ color: 'rgba(255,255,255,0.6)' }}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const lastPhoto = photos.length > 0 ? photos[photos.length - 1] : null;

  return (
    <View style={{ flex: 1 }}>
      <CameraView ref={cameraRef} style={{ flex: 1 }} facing={facing} />

      {/* Top Bar */}
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => router.back()} style={styles.iconBtn}>
          <MaterialIcons name="close" size={24} color="#fff" />
        </TouchableOpacity>
        <View style={styles.roomBadge}>
          <Text style={styles.roomName}>{roomName}</Text>
          <Text style={styles.floorName}>{floorName}</Text>
        </View>
        <View style={{ width: 48 }} />
      </View>

      {/* Photo Counter */}
      <View style={styles.counterBadge}>
        <MaterialIcons name="photo-camera" size={14} color="#fff" />
        <Text style={styles.counterText}>{photos.length}</Text>
      </View>

      {/* Bottom Controls */}
      <View style={styles.bottomControls}>
        {/* Last Photo Thumbnail */}
        <View style={styles.thumbnailContainer}>
          {lastPhoto ? (
            <Image source={{ uri: lastPhoto }} style={styles.thumbnail} />
          ) : (
            <View style={styles.thumbnailEmpty}>
              <MaterialIcons name="image" size={20} color="#666" />
            </View>
          )}
        </View>

        {/* Capture Button */}
        <TouchableOpacity
          onPress={handleCapture}
          disabled={isCapturing}
          style={[styles.captureBtn, isCapturing && { opacity: 0.5 }]}
        >
          <View style={styles.captureBtnInner} />
        </TouchableOpacity>

        {/* Done Button */}
        <TouchableOpacity
          onPress={handleDone}
          style={styles.doneBtn}
        >
          <MaterialIcons name="check" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  white: { color: '#fff' },
  permTitle: { color: '#fff', fontSize: 18, fontWeight: '600', marginTop: 16 },
  permSubtitle: { color: 'rgba(255,255,255,0.6)', fontSize: 14, marginTop: 8, textAlign: 'center' },
  permBtn: { marginTop: 24, paddingHorizontal: 24, paddingVertical: 12, backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: 999 },
  permBtnText: { color: '#fff', fontWeight: '600' },
  topBar: {
    position: 'absolute',
    top: 50,
    left: 20,
    right: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  iconBtn: {
    width: 48,
    height: 48,
    backgroundColor: 'rgba(0,0,0,0.4)',
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  roomBadge: {
    backgroundColor: 'rgba(0,0,0,0.4)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    alignItems: 'center',
  },
  roomName: { color: '#fff', fontSize: 14, fontWeight: '600' },
  floorName: { color: 'rgba(255,255,255,0.6)', fontSize: 12 },
  counterBadge: {
    position: 'absolute',
    top: 110,
    right: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 16,
  },
  counterText: { color: '#fff', fontSize: 14, fontWeight: '600' },
  bottomControls: {
    position: 'absolute',
    bottom: 40,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 40,
  },
  thumbnailContainer: {
    width: 56,
    height: 56,
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#fff',
  },
  thumbnail: {
    width: '100%',
    height: '100%',
  },
  thumbnailEmpty: {
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.4)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  captureBtn: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: 'rgba(255,255,255,0.3)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 4,
    borderColor: '#fff',
  },
  captureBtnInner: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: '#fff',
  },
  doneBtn: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#03224d',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
