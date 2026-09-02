import { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, ActivityIndicator, RefreshControl } from 'react-native';
import { Link, useRouter, useLocalSearchParams } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import {
  getPropertyStructure,
  PropertyStructureData,
} from '@/services/propertyService';
import { getRoomTypeIcon, CaptureStatus } from '@/types/ar';

const STATUS_CONFIG: Record<
  CaptureStatus,
  { badge: string; badgeText: string; icon: string; iconColor: string }
> = {
  pending: {
    badge: 'bg-gray-200',
    badgeText: 'text-gray-600',
    icon: 'schedule',
    iconColor: '#6b7280',
  },
  in_progress: {
    badge: 'bg-amber-100',
    badgeText: 'text-amber-700',
    icon: 'pending',
    iconColor: '#d97706',
  },
  completed: {
    badge: 'bg-primary/10',
    badgeText: 'text-primary',
    icon: 'check-circle',
    iconColor: '#03224d',
  },
  failed: {
    badge: 'bg-red-100',
    badgeText: 'text-red-600',
    icon: 'error',
    iconColor: '#dc2626',
  },
};

const STATUS_LABEL: Record<CaptureStatus, string> = {
  pending: 'Pending',
  in_progress: 'In Progress',
  completed: 'Completed',
  failed: 'Failed',
};

export default function CaptureChecklist() {
  const router = useRouter();
  const { propertyId } = useLocalSearchParams<{ propertyId: string }>();

  const [data, setData] = useState<PropertyStructureData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  async function fetchStructure() {
    if (!propertyId) {
      setError('No property ID provided.');
      setIsLoading(false);
      return;
    }
    try {
      setError(null);
      const result = await getPropertyStructure(propertyId);
      setData(result);
    } catch (err: any) {
      setError(err?.message ?? 'Failed to load property structure.');
    } finally {
      setIsLoading(false);
      setRefreshing(false);
    }
  }

  useEffect(() => {
    fetchStructure();
  }, [propertyId]);

  function onRefresh() {
    setRefreshing(true);
    fetchStructure();
  }

  function handleCaptureRoom(floorId: string, roomId: string, roomName: string, floorName: string) {
    router.push({
      pathname: '/(seller)/ar-capture',
      params: { propertyId, floorId, roomId, roomName, floorName },
    });
  }

  // ─── Loading / Error states ───────────────────────────────────────────────

  if (isLoading) {
    return (
      <View className="flex-1 bg-background items-center justify-center">
        <ActivityIndicator size="large" color="#03224d" />
        <Text className="text-on-surface-variant text-sm mt-4">Loading property…</Text>
      </View>
    );
  }

  if (error || !data) {
    return (
      <View className="flex-1 bg-background items-center justify-center px-8">
        <MaterialIcons name="error-outline" size={48} color="#dc2626" />
        <Text className="text-primary font-bold text-lg mt-4">Something went wrong</Text>
        <Text className="text-on-surface-variant text-sm text-center mt-2">
          {error ?? 'Property not found.'}
        </Text>
        <Link href="/(seller)/dashboard" className="mt-6 py-3 px-6 bg-primary rounded-full">
          <Text className="text-on-primary font-semibold">Back to Dashboard</Text>
        </Link>
      </View>
    );
  }

  // ─── Derived data ─────────────────────────────────────────────────────────

  const totalRooms = data.floors.reduce((sum, f) => sum + f.rooms.length, 0);
  const completedRooms = data.floors.reduce(
    (sum, f) => sum + f.rooms.filter((r) => r.capture_status === 'completed').length,
    0
  );
  const allDone = totalRooms > 0 && completedRooms === totalRooms;

  // ─── Render ───────────────────────────────────────────────────────────────

  return (
    <View className="flex-1 bg-background">
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 40 }}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        {/* Header */}
        <View className="px-5 pt-4 flex-row items-center gap-3">
          <Link href="/(seller)/dashboard" className="w-10 h-10 items-center justify-center">
            <MaterialIcons name="arrow-back" size={24} color="#03224d" />
          </Link>
          <Text className="text-[22px] font-bold text-primary">Capture Checklist</Text>
        </View>

        {/* Property Summary */}
        <View className="mx-5 mt-6 bg-white rounded-[20px] shadow-sm border border-surface-container-low p-5">
          <Text className="text-[16px] font-bold text-primary mb-3">Property</Text>
          <View className="gap-2">
            <View className="flex-row items-center gap-2">
              <MaterialIcons name="location-on" size={16} color="#835400" />
              <Text className="text-on-surface-variant text-sm flex-1" numberOfLines={1}>
                {data.location}{data.city ? `, ${data.city}` : ''}
              </Text>
            </View>
            <View className="flex-row items-center gap-2">
              <MaterialIcons name="layers" size={16} color="#835400" />
              <Text className="text-on-surface-variant text-sm">
                {data.total_floors} floor{data.total_floors !== 1 ? 's' : ''} • {totalRooms} room{totalRooms !== 1 ? 's' : ''}
              </Text>
            </View>
          </View>
        </View>

        {/* Overall Progress */}
        <View className="mx-5 mt-4 bg-white rounded-[20px] shadow-sm border border-surface-container-low p-5">
          <View className="flex-row items-center justify-between mb-1">
            <Text className="text-[16px] font-bold text-primary">Progress</Text>
            <Text className="text-on-surface-variant text-xs font-semibold">
              {completedRooms}/{totalRooms} rooms
            </Text>
          </View>
          <View className="w-full h-2 bg-surface-container-high rounded-full mt-2">
            <View
              className="h-2 bg-primary rounded-full"
              style={{ width: totalRooms > 0 ? `${(completedRooms / totalRooms) * 100}%` : '0%' }}
            />
          </View>
          {allDone && (
            <View className="flex-row items-center gap-2 mt-3 bg-primary/10 rounded-[12px] px-3 py-2">
              <MaterialIcons name="celebration" size={18} color="#03224d" />
              <Text className="text-primary text-sm font-semibold">All rooms captured!</Text>
            </View>
          )}
        </View>

        {/* Room List by Floor */}
        {data.floors.map((floor) => (
          <View
            key={floor.id}
            className="mx-5 mt-4 bg-white rounded-[20px] shadow-sm border border-surface-container-low p-5"
          >
            {/* Floor header */}
            <View className="flex-row items-center gap-2 mb-3">
              <View className="w-8 h-8 bg-secondary rounded-full items-center justify-center">
                <Text className="text-white text-xs font-bold">{floor.floor_number}</Text>
              </View>
              <Text className="text-[16px] font-bold text-primary">
                {floor.name || `Floor ${floor.floor_number}`}
              </Text>
            </View>

            {/* Rooms */}
            {floor.rooms.map((room) => {
              const status = (room.capture_status as CaptureStatus) ?? 'pending';
              const cfg = STATUS_CONFIG[status];

              return (
                <TouchableOpacity
                  key={room.id}
                  onPress={() =>
                    handleCaptureRoom(
                      floor.id,
                      room.id,
                      room.name,
                      floor.name || `Floor ${floor.floor_number}`
                    )
                  }
                  className="flex-row items-center gap-3 bg-surface-container-low rounded-[14px] px-4 py-3 mb-2"
                >
                  {/* Room type icon */}
                  <View className="w-10 h-10 rounded-full bg-white items-center justify-center">
                    <MaterialIcons
                      name={getRoomTypeIcon(room.type as any) as any}
                      size={20}
                      color="#835400"
                    />
                  </View>

                  {/* Room info */}
                  <View className="flex-1">
                    <Text className="text-on-surface text-sm font-semibold">{room.name}</Text>
                    <Text className="text-on-surface-variant text-xs capitalize">
                      {room.type.replace('_', ' ')}
                    </Text>
                  </View>

                  {/* Status badge */}
                  <View className={`flex-row items-center gap-1 px-2.5 py-1.5 rounded-full ${cfg.badge}`}>
                    <MaterialIcons name={cfg.icon as any} size={14} color={cfg.iconColor} />
                    <Text className={`text-[11px] font-semibold ${cfg.badgeText}`}>
                      {STATUS_LABEL[status]}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        ))}
      </ScrollView>
    </View>
  );
}
