import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert, ActivityIndicator } from 'react-native';
import { Link, useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { RoomType, ROOM_OPTIONS, FloorInput, RoomInput } from '@/types/ar';
import { useAddPropertyStore } from '@/store/addPropertyStore';
import { createPropertyWithStructure } from '@/services/propertyService';
import { useAuthStore } from '@/store/authStore';

const STEPS = ['Basic', 'Structure', 'Photos', 'Location', 'Review'];
const STEP = 2;

let nextId = 100;
function genId(): string {
  return `temp_${nextId++}`;
}

function createEmptyRoom(): RoomInput {
  return { id: genId(), name: '', type: 'living_room' };
}

function createEmptyFloor(number: number): FloorInput {
  return {
    id: genId(),
    floor_number: number,
    name: '',
    rooms: [createEmptyRoom()],
  };
}

function RoomTypeSelector({
  selected,
  onSelect,
}: {
  selected: RoomType;
  onSelect: (t: RoomType) => void;
}) {
  return (
    <View className="flex-row flex-wrap gap-2">
      {ROOM_OPTIONS.map((opt) => (
        <TouchableOpacity
          key={opt.value}
          onPress={() => onSelect(opt.value)}
          className={`flex-row items-center gap-1.5 px-3 py-2 rounded-full ${
            selected === opt.value
              ? 'bg-primary'
              : 'bg-surface-container-low'
          }`}
        >
          <MaterialIcons
            name={opt.icon as any}
            size={14}
            color={selected === opt.value ? '#fff' : '#747780'}
          />
          <Text
            className={`text-xs font-semibold ${
              selected === opt.value ? 'text-on-primary' : 'text-on-surface-variant'
            }`}
          >
            {opt.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

export default function Step2Rooms() {
  const router = useRouter();
  const { address: storeAddress, city: storeCity, floors: storeFloors, title, description, propertyType, area, setStep2, setSupabaseIds } = useAddPropertyStore();
  const user = useAuthStore((s) => s.user);

  const [address, setAddress] = useState(storeAddress);
  const [city, setCity] = useState(storeCity);
  const [floors, setFloors] = useState<FloorInput[]>(
    storeFloors.length > 0
      ? storeFloors
      : [createEmptyFloor(1)]
  );
  const [isSaving, setIsSaving] = useState(false);

  const totalFloors = floors.length;
  const totalRooms = floors.reduce((sum, f) => sum + f.rooms.length, 0);

  function updateFloorCount(count: number) {
    const clamped = Math.max(1, Math.min(10, count));
    setFloors((prev) => {
      if (clamped > prev.length) {
        const newFloors = [...prev];
        for (let i = prev.length; i < clamped; i++) {
          newFloors.push(createEmptyFloor(i + 1));
        }
        return newFloors;
      }
      return prev.slice(0, clamped);
    });
  }

  function updateFloorName(floorId: string, name: string) {
    setFloors((prev) =>
      prev.map((f) => (f.id === floorId ? { ...f, name } : f))
    );
  }

  function addRoom(floorId: string) {
    setFloors((prev) =>
      prev.map((f) =>
        f.id === floorId
          ? { ...f, rooms: [...f.rooms, createEmptyRoom()] }
          : f
      )
    );
  }

  function removeRoom(floorId: string, roomId: string) {
    setFloors((prev) =>
      prev.map((f) =>
        f.id === floorId
          ? { ...f, rooms: f.rooms.filter((r) => r.id !== roomId) }
          : f
      )
    );
  }

  function updateRoomName(floorId: string, roomId: string, name: string) {
    setFloors((prev) =>
      prev.map((f) =>
        f.id === floorId
          ? {
              ...f,
              rooms: f.rooms.map((r) =>
                r.id === roomId ? { ...r, name } : r
              ),
            }
          : f
      )
    );
  }

  function updateRoomType(floorId: string, roomId: string, type: RoomType) {
    setFloors((prev) =>
      prev.map((f) =>
        f.id === floorId
          ? {
              ...f,
              rooms: f.rooms.map((r) =>
                r.id === roomId ? { ...r, type } : r
              ),
            }
          : f
      )
    );
  }

  async function saveAndContinue(): Promise<boolean> {
    if (!address.trim()) {
      Alert.alert('Missing Address', 'Please enter the property address.');
      return false;
    }
    if (!city.trim()) {
      Alert.alert('Missing City', 'Please enter the city.');
      return false;
    }
    for (const floor of floors) {
      const namedRooms = floor.rooms.filter((r) => r.name.trim());
      if (namedRooms.length === 0) {
        Alert.alert(
          'Empty Floor',
          `Floor ${floor.floor_number} has no rooms. Add at least one room or remove the floor.`
        );
        return false;
      }
    }
    if (!user?.id) {
      Alert.alert('Auth Error', 'You must be logged in to create a property.');
      return false;
    }

    const floorsToSave: FloorInput[] = floors.map((f) => ({
      id: f.id,
      floor_number: f.floor_number,
      name: f.name.trim(),
      rooms: f.rooms
        .filter((r) => r.name.trim())
        .map((r) => ({
          id: r.id,
          name: r.name.trim(),
          type: r.type,
        })),
    }));

    setIsSaving(true);
    try {
      const result = await createPropertyWithStructure({
        sellerId: user.id,
        title,
        description,
        propertyType,
        area,
        location: address.trim(),
        city: city.trim(),
        floors: floorsToSave,
      });

      setStep2({ address: address.trim(), city: city.trim(), floors: floorsToSave });
      setSupabaseIds({
        propertyId: result.propertyId,
        floorIds: result.floorIds,
        roomIds: result.roomIds,
      });
      return true;
    } catch (err: any) {
      Alert.alert('Save Failed', err?.message ?? 'Could not save property structure.');
      return false;
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <View className="flex-1 bg-background">
      <ScrollView className="flex-1" contentContainerStyle={{ paddingBottom: 40 }}>
        {/* Header */}
        <View className="px-5 pt-4 flex-row items-center gap-3">
          <Link href="/(seller)/add-property/step-1-basic" className="w-10 h-10 items-center justify-center">
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
        <View className="flex-row px-3 mt-2">
          {STEPS.map((l) => (
            <Text key={l} className="text-[10px] text-center text-on-surface-variant" style={{ width: '20%' }}>{l}</Text>
          ))}
        </View>

        {/* Property Address */}
        <View className="mx-5 mt-6 bg-white rounded-[20px] shadow-sm border border-surface-container-low p-5">
          <Text className="text-[16px] font-bold text-primary mb-1">Property Address</Text>
          <Text className="text-on-surface-variant text-xs mb-4">
            Where is this property located?
          </Text>

          <Text className="text-on-surface-variant text-sm font-semibold mb-2">Address</Text>
          <TextInput
            placeholder="e.g. 123 Main Street, Apt 4B"
            placeholderTextColor="#747780"
            value={address}
            onChangeText={setAddress}
            className="bg-surface-container-low rounded-[14px] px-4 py-3.5 text-on-surface mb-4"
          />

          <Text className="text-on-surface-variant text-sm font-semibold mb-2">City</Text>
          <TextInput
            placeholder="e.g. Karachi"
            placeholderTextColor="#747780"
            value={city}
            onChangeText={setCity}
            className="bg-surface-container-low rounded-[14px] px-4 py-3.5 text-on-surface"
          />
        </View>

        {/* Building Structure Summary */}
        <View className="mx-5 mt-4 bg-white rounded-[20px] shadow-sm border border-surface-container-low p-5">
          <View className="flex-row items-center justify-between mb-1">
            <Text className="text-[16px] font-bold text-primary">Building Structure</Text>
            <Text className="text-on-surface-variant text-xs font-semibold">
              {totalFloors} floor{totalFloors !== 1 ? 's' : ''} • {totalRooms} room{totalRooms !== 1 ? 's' : ''}
            </Text>
          </View>
          <Text className="text-on-surface-variant text-xs mb-4">
            How many floors does this property have?
          </Text>

          <View className="flex-row items-center gap-4 bg-surface-container-low rounded-[14px] px-4 py-3">
            <TouchableOpacity
              onPress={() => updateFloorCount(totalFloors - 1)}
              className="w-9 h-9 bg-white rounded-full items-center justify-center"
            >
              <MaterialIcons name="remove" size={20} color="#03224d" />
            </TouchableOpacity>
            <Text className="text-primary font-bold text-2xl flex-1 text-center">
              {totalFloors}
            </Text>
            <TouchableOpacity
              onPress={() => updateFloorCount(totalFloors + 1)}
              className="w-9 h-9 bg-secondary rounded-full items-center justify-center"
            >
              <MaterialIcons name="add" size={20} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Floors & Rooms */}
        {floors.map((floor) => (
          <View
            key={floor.id}
            className="mx-5 mt-4 bg-white rounded-[20px] shadow-sm border border-surface-container-low p-5"
          >
            <View className="flex-row items-center justify-between mb-3">
              <View className="flex-row items-center gap-2">
                <View className="w-8 h-8 bg-secondary rounded-full items-center justify-center">
                  <Text className="text-white text-xs font-bold">{floor.floor_number}</Text>
                </View>
                <Text className="text-[16px] font-bold text-primary">
                  Floor {floor.floor_number}
                </Text>
              </View>
              {totalFloors > 1 && (
                <TouchableOpacity
                  onPress={() => updateFloorCount(totalFloors - 1)}
                  className="w-8 h-8 bg-red-50 rounded-full items-center justify-center"
                >
                  <MaterialIcons name="delete-outline" size={18} color="#dc2626" />
                </TouchableOpacity>
              )}
            </View>

            <Text className="text-on-surface-variant text-sm font-semibold mb-2">
              Floor Label (optional)
            </Text>
            <TextInput
              placeholder={`e.g. ${floor.floor_number === 1 ? 'Ground Floor' : `Floor ${floor.floor_number}`}`}
              placeholderTextColor="#747780"
              value={floor.name}
              onChangeText={(name) => updateFloorName(floor.id, name)}
              className="bg-surface-container-low rounded-[14px] px-4 py-3 text-on-surface mb-4"
            />

            <Text className="text-on-surface-variant text-sm font-semibold mb-2">
              Rooms / Spaces
            </Text>

            {floor.rooms.map((room, roomIdx) => (
              <View
                key={room.id}
                className="mb-4 bg-surface-container-low rounded-[14px] p-4"
              >
                <View className="flex-row items-center justify-between mb-3">
                  <Text className="text-xs font-bold text-on-surface-variant">
                    Room {roomIdx + 1}
                  </Text>
                  {floor.rooms.length > 1 && (
                    <TouchableOpacity
                      onPress={() => removeRoom(floor.id, room.id)}
                      className="w-7 h-7 bg-white rounded-full items-center justify-center"
                    >
                      <MaterialIcons name="close" size={16} color="#dc2626" />
                    </TouchableOpacity>
                  )}
                </View>

                <TextInput
                  placeholder="Room name (e.g. Living Room)"
                  placeholderTextColor="#747780"
                  value={room.name}
                  onChangeText={(name) => updateRoomName(floor.id, room.id, name)}
                  className="bg-white rounded-[12px] px-4 py-3 text-on-surface mb-3"
                />

                <Text className="text-on-surface-variant text-xs font-semibold mb-2">
                  Room Type
                </Text>
                <RoomTypeSelector
                  selected={room.type}
                  onSelect={(type) => updateRoomType(floor.id, room.id, type)}
                />
              </View>
            ))}

            <TouchableOpacity
              onPress={() => addRoom(floor.id)}
              className="flex-row items-center justify-center gap-2 py-3 border-2 border-dashed border-secondary rounded-[14px]"
            >
              <MaterialIcons name="add" size={18} color="#835400" />
              <Text className="text-secondary font-semibold text-sm">Add Room</Text>
            </TouchableOpacity>
          </View>
        ))}

        {/* Navigation */}
        <View className="flex-row gap-3 px-5 mt-8">
          <Link href="/(seller)/add-property/step-1-basic" className="flex-1 py-4 border-2 border-primary rounded-full items-center">
            <Text className="text-primary font-semibold">Back</Text>
          </Link>
          <TouchableOpacity
            disabled={isSaving}
            onPress={async () => {
              const ok = await saveAndContinue();
              if (ok) {
                const pid = useAddPropertyStore.getState().propertyId;
                if (pid) router.push({ pathname: '/(seller)/capture-checklist' as any, params: { propertyId: pid } });
              }
            }}
            className={`flex-1 py-4 rounded-full items-center flex-row justify-center ${isSaving ? 'bg-primary/60' : 'bg-primary'}`}
          >
            {isSaving ? (
              <ActivityIndicator color="#fff" size="small" />
            ) : (
              <>
                <Text className="text-on-primary font-semibold mr-2">Next</Text>
                <MaterialIcons name="chevron-right" size={20} color="#fff" />
              </>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
