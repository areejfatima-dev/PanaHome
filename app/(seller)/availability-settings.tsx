import { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { Link } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

export default function AvailabilitySettings() {
  const [schedule, setSchedule] = useState<Record<string, number>>({
    Monday: 2,
    Tuesday: 0,
    Wednesday: 1,
    Thursday: 1,
    Friday: 1,
    Saturday: 1,
    Sunday: 0,
  });
  const [applyAll, setApplyAll] = useState(false);

  const toggle = (day: string) => {
    setSchedule((s) => ({ ...s, [day]: s[day] === 0 ? 1 : 0 }));
  };

  return (
    <View className="flex-1 bg-background">
      <ScrollView className="flex-1" contentContainerStyle={{ paddingBottom: 40 }}>
        {/* Header */}
        <View className="px-5 pt-4 flex-row items-center gap-3">
          <Link href="/(seller)/dashboard" className="w-10 h-10 items-center justify-center">
            <MaterialIcons name="arrow-back" size={24} color="#03224d" />
          </Link>
          <Text className="text-[22px] font-bold text-primary">Visit Availability</Text>
        </View>

        {/* Apply schedule to all */}
        <View className="mx-5 mt-4 flex-row items-center justify-between bg-primary rounded-[16px] px-5 py-4 shadow-lg">
          <Text className="text-on-primary font-bold">APPLY SCHEDULE TO All Listings</Text>
          <Switch
            value={applyAll}
            onValueChange={setApplyAll}
            trackColor={{ false: '#ffffff40', true: '#feb64e' }}
            thumbColor={applyAll ? '#835400' : '#fff'}
          />
        </View>

        {/* Weekly schedule */}
        <View className="mx-5 mt-6 bg-white rounded-[20px] shadow-sm border border-surface-container-low p-5">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-[16px] font-bold text-primary">WEEKLY SCHEDULE</Text>
            <TouchableOpacity className="flex-row items-center gap-1">
              <MaterialIcons name="content-copy" size={16} color="#835400" />
              <Text className="text-secondary text-xs font-semibold">Copy to all days</Text>
            </TouchableOpacity>
          </View>

          {DAYS.map((day) => {
            const slots = schedule[day];
            return (
              <View key={day} className="py-3 border-b border-surface-container">
                <View className="flex-row items-center justify-between">
                  <Text className="text-primary font-semibold">{day}</Text>
                  {slots === 0 ? (
                    <TouchableOpacity
                      onPress={() => toggle(day)}
                      className="px-4 py-1.5 bg-surface-container-low rounded-full"
                    >
                      <Text className="text-error text-xs font-semibold">Unavailable</Text>
                    </TouchableOpacity>
                  ) : (
                    <View className="flex-row items-center gap-3">
                      <Text className="text-on-surface-variant text-xs">{slots} Slot{slots > 1 ? 's' : ''}</Text>
                      <TouchableOpacity onPress={() => toggle(day)} className="w-7 h-7 bg-surface-container-low rounded-full items-center justify-center">
                        <MaterialIcons name="delete" size={16} color="#44474f" />
                      </TouchableOpacity>
                      <TouchableOpacity className="w-7 h-7 bg-surface-container-low rounded-full items-center justify-center">
                        <MaterialIcons name="add" size={16} color="#835400" />
                      </TouchableOpacity>
                    </View>
                  )}
                </View>
              </View>
            );
          })}
        </View>

        {/* Save */}
        <TouchableOpacity className="mx-5 mt-8 py-4 bg-primary rounded-full items-center flex-row justify-center shadow-lg">
          <MaterialIcons name="save" size={18} color="#fff" style={{ marginRight: 8 }} />
          <Text className="text-on-primary font-semibold">Save Availability</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Bottom Nav Bar */}
      <View className="absolute bottom-6 left-6 right-6 flex-row justify-around items-center px-4 py-3 bg-white/70 backdrop-blur-xl border border-white/30 shadow-lg rounded-full">
        <Link href="/(seller)/dashboard" className="flex-col items-center justify-center">
          <MaterialIcons name="dashboard" size={22} color="#44474f" />
          <Text className="text-xs font-semibold text-on-surface-variant">Dashboard</Text>
        </Link>
        <Link href="/(seller)/dashboard" className="flex-col items-center justify-center">
          <MaterialIcons name="domain" size={22} color="#44474f" />
          <Text className="text-xs font-semibold text-on-surface-variant">Listings</Text>
        </Link>
        <Link href="/(seller)/analytics" className="flex-col items-center justify-center">
          <MaterialIcons name="analytics" size={22} color="#44474f" />
          <Text className="text-xs font-semibold text-on-surface-variant">Analytics</Text>
        </Link>
        <Link href="/(seller)/availability-settings" className="flex-col items-center justify-center">
          <MaterialIcons name="calendar-today" size={22} color="#835400" />
          <Text className="text-xs font-bold text-secondary">Availability</Text>
        </Link>
        <Link href="/(seller)/profile" className="flex-col items-center justify-center">
          <MaterialIcons name="person" size={22} color="#44474f" />
          <Text className="text-xs font-semibold text-on-surface-variant">Profile</Text>
        </Link>
      </View>
    </View>
  );
}
