import { View, Text, TouchableOpacity, Platform } from 'react-native';
import { Link, useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { useAddPropertyStore } from '@/store/addPropertyStore';
import { getRoomTypeIcon } from '@/types/ar';

const STEPS = ['Basic', 'Structure', 'Photos', 'Location', 'Review'];
const STEP = 3;

let ImagePicker: any = null;
if (Platform.OS !== 'web') {
  try {
    ImagePicker = require('expo-image-picker');
  } catch (e) {
    // Module not available
  }
}

export default function Step3Capture() {
  const router = useRouter();
  const { title, address, city, floors, frontElevationUri, setFrontElevation, getRoomCaptureStatus } = useAddPropertyStore();

  async function pickFrontElevation() {
    if (!ImagePicker) {
      alert('Image picker is only available on mobile devices.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.8,
    });

    if (!result.canceled && result.assets[0]) {
      setFrontElevation(result.assets[0].uri);
    }
  }

  function handleCaptureRoom(floorId: string, roomId: string, roomName: string, floorName: string) {
    router.push({
      pathname: '/(seller)/ar-capture',
      params: {
        floorId,
        roomId,
        roomName,
        floorName,
      },
    } as any);
  }

  const totalRooms = floors.reduce((sum, f) => sum + f.rooms.length, 0);
  const capturedRooms = floors.reduce(
    (sum, f) => sum + f.rooms.filter((r) => getRoomCaptureStatus(r.id) === 'completed').length,
    0
  );

  return (
    <View className="flex-1 bg-background">
      {/* Header */}
      <View className="px-5 pt-4 flex-row items-center gap-3">
        <Link href="/(seller)/add-property/step-2-rooms" className="w-10 h-10 items-center justify-center">
          <MaterialIcons name="arrow-back" size={24} color="#03224d" />
        </Link>
        <Text className="text-[22px] font-bold text-primary">Add Property</Text>
      </View>

      {/* Stepper */}
      <View className="flex-row items-center px-5 mt-5">
        {STEPS.map((s, i) => {
          const done = i < STEP - 1;
          const active = i === STEP - 1;
          return (
            <View key={s} className="flex-row items-center flex-1">
              <View className={`w-8 h-8 rounded-full items-center justify-center ${done ? 'bg-primary' : active ? 'bg-secondary' : 'bg-surface-container-high'}`}>
                <Text className={`text-xs font-bold ${done || active ? 'text-white' : 'text-on-surface-variant'}`}>{i + 1}</Text>
              </View>
              {i < STEPS.length - 1 && <View className={`flex-1 h-0.5 ${i < STEP - 1 ? 'bg-primary' : 'bg-surface-container-high'}`} />}
            </View>
          );
        })}
      </View>

      {/* Property Summary */}
      <View className="mx-5 mt-6 bg-white rounded-[20px] shadow-sm border border-surface-container-low p-5">
        <Text className="text-[16px] font-bold text-primary mb-3">Property Summary</Text>
        <View className="gap-2">
          <View className="flex-row items-center gap-2">
            <MaterialIcons name="home" size={16} color="#835400" />
            <Text className="text-on-surface text-sm font-medium flex-1" numberOfLines={1}>
              {title || 'Untitled Property'}
            </Text>
          </View>
          <View className="flex-row items-center gap-2">
            <MaterialIcons name="location-on" size={16} color="#835400" />
            <Text className="text-on-surface-variant text-sm flex-1" numberOfLines={1}>
              {address}{city ? `, ${city}` : ''}
            </Text>
          </View>
          <View className="flex-row items-center gap-2">
            <MaterialIcons name="layers" size={16} color="#835400" />
            <Text className="text-on-surface-variant text-sm">
              {floors.length} floor{floors.length !== 1 ? 's' : ''} • {totalRooms} room{totalRooms !== 1 ? 's' : ''}
            </Text>
          </View>
        </View>
      </View>

      {/* Front Elevation */}
      <View className="mx-5 mt-4 bg-white rounded-[20px] shadow-sm border border-surface-container-low p-5">
        <Text className="text-[16px] font-bold text-primary mb-1">Front Elevation</Text>
        <Text className="text-on-surface-variant text-xs mb-4">
          Upload a photo of the property's front view.
        </Text>

        <TouchableOpacity
          onPress={pickFrontElevation}
          className={`h-40 rounded-[14px] items-center justify-center ${
            frontElevationUri
              ? 'bg-primary/10 border border-primary/40'
              : 'border-2 border-dashed border-surface-container-highest'
          }`}
        >
          {frontElevationUri ? (
            <View className="w-full h-full items-center justify-center bg-primary/10 rounded-[14px]">
              <MaterialIcons name="check-circle" size={36} color="#03224d" />
              <Text className="text-primary text-sm font-semibold mt-2">Photo uploaded</Text>
            </View>
          ) : (
            <>
              <MaterialIcons name="add-a-photo" size={36} color="#747780" />
              <Text className="text-on-surface-variant text-sm font-semibold mt-2">
                Tap to upload photo
              </Text>
            </>
          )}
        </TouchableOpacity>
      </View>

      {/* Room Capture List */}
      <View className="mx-5 mt-4 bg-white rounded-[20px] shadow-sm border border-surface-container-low p-5">
        <View className="flex-row items-center justify-between mb-1">
          <Text className="text-[16px] font-bold text-primary">Room Capture</Text>
          <Text className="text-on-surface-variant text-xs font-semibold">
            {capturedRooms}/{totalRooms}
          </Text>
        </View>
        <Text className="text-on-surface-variant text-xs mb-4">
          Capture photos for each room to create the AR walkthrough.
        </Text>

        {floors.map((floor) => (
          <View key={floor.id} className="mb-4">
            <View className="flex-row items-center gap-2 mb-3">
              <View className="w-6 h-6 bg-secondary rounded-full items-center justify-center">
                <Text className="text-white text-[10px] font-bold">{floor.floor_number}</Text>
              </View>
              <Text className="text-primary font-bold text-sm">
                {floor.name || `Floor ${floor.floor_number}`}
              </Text>
            </View>

            {floor.rooms.map((room) => {
              const isCompleted = getRoomCaptureStatus(room.id) === 'completed';
              return (
                <TouchableOpacity
                  key={room.id}
                  onPress={() => handleCaptureRoom(floor.id, room.id, room.name, floor.name || `Floor ${floor.floor_number}`)}
                  className="flex-row items-center gap-3 bg-surface-container-low rounded-[14px] px-4 py-3 mb-2"
                >
                  <View className={`w-10 h-10 rounded-full items-center justify-center ${
                    isCompleted ? 'bg-primary' : 'bg-white'
                  }`}>
                    <MaterialIcons
                      name={isCompleted ? 'check' : getRoomTypeIcon(room.type) as any}
                      size={20}
                      color={isCompleted ? '#fff' : '#835400'}
                    />
                  </View>
                  <View className="flex-1">
                    <Text className="text-on-surface text-sm font-semibold">{room.name}</Text>
                    <Text className="text-on-surface-variant text-xs capitalize">
                      {room.type.replace('_', ' ')}
                    </Text>
                  </View>
                  <View className={`px-3 py-1.5 rounded-full ${
                    isCompleted ? 'bg-primary/10' : 'bg-secondary'
                  }`}>
                    <MaterialIcons
                      name={isCompleted ? 'check-circle' : 'photo-camera'}
                      size={16}
                      color={isCompleted ? '#03224d' : '#fff'}
                    />
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        ))}
      </View>

      {/* Navigation */}
      <View className="flex-row gap-3 px-5 mt-8 mb-8">
        <Link href="/(seller)/add-property/step-2-rooms" className="flex-1 py-4 border-2 border-primary rounded-full items-center">
          <Text className="text-primary font-semibold">Back</Text>
        </Link>
        <Link href="/(seller)/add-property/step-4-location" className="flex-1 py-4 bg-primary rounded-full items-center flex-row justify-center">
          <Text className="text-on-primary font-semibold mr-2">Next</Text>
          <MaterialIcons name="chevron-right" size={20} color="#fff" />
        </Link>
      </View>
    </View>
  );
}
