import { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';

const GROUPS = [
  {
    label: 'Today',
    items: [
      { id: '1', title: 'Azure Horizon Penthouse', time: 'Viewed 2 hours ago', price: '$2,450,000', badge: 'AI-VERIFIED' },
      { id: '2', title: 'Marble Heights Studio', time: 'Viewed 5 hours ago', price: '$890,000', badge: 'NEW LISTING' },
    ],
  },
  {
    label: 'Yesterday',
    items: [{ id: '3', title: 'Echo Point Estate', time: 'Viewed yesterday', price: '$4,200,000', badge: 'INVESTMENT' }],
  },
  {
    label: 'This Week',
    items: [{ id: '4', title: 'Onyx Loft Suite', time: 'Viewed 4 days ago', price: '$1,150,000', badge: 'AI-VERIFIED' }],
  },
];

export default function History() {
  const [cleared, setCleared] = useState(false);
  const [hidden, setHidden] = useState<string[]>([]);

  if (cleared) {
    return (
      <View className="flex-1 bg-background items-center justify-center px-8">
        <View className="w-24 h-24 bg-surface-container-lowest rounded-full items-center justify-center mb-6">
          <MaterialIcons name="history" size={44} color="#835400" />
        </View>
        <Text className="text-[22px] font-bold text-primary mb-2">No History Yet</Text>
        <Text className="text-on-surface-variant text-center text-sm leading-5">
          Start exploring the finest properties and your recently viewed homes will appear here.
        </Text>
        <TouchableOpacity
          onPress={() => setCleared(false)}
          className="mt-8 px-8 py-3.5 bg-primary rounded-full"
        >
          <Text className="text-on-primary font-semibold">Browse Properties</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-background">
      <ScrollView className="flex-1" contentContainerStyle={{ paddingBottom: 120 }}>
        <View className="px-5 pt-6">
          <View className="flex-row justify-between items-center">
            <View>
              <Text className="text-[26px] font-bold text-primary">Recently Viewed</Text>
              <Text className="text-on-surface-variant text-sm mt-1">6 Properties</Text>
            </View>
            <TouchableOpacity onPress={() => setCleared(true)} className="flex-row items-center gap-1">
              <MaterialIcons name="delete-sweep" size={18} color="#835400" />
              <Text className="text-secondary font-semibold text-sm">Clear All</Text>
            </TouchableOpacity>
          </View>
        </View>

        {GROUPS.map((group) => (
          <View key={group.label} className="mt-7">
            <Text className="px-5 text-on-surface-variant text-xs font-bold uppercase tracking-wider mb-3">
              {group.label}
            </Text>
            <View className="gap-3">
              {group.items
                .filter((i) => !hidden.includes(i.id))
                .map((item) => (
                  <TouchableOpacity
                    key={item.id}
                    className="flex-row items-center gap-4 mx-5 bg-white p-3 rounded-[20px] shadow-sm border border-surface-container-low"
                  >
                    <View className="w-16 h-16 rounded-[14px] bg-surface-container-high items-center justify-center">
                      <MaterialIcons name="apartment" size={28} color="#747780" />
                    </View>
                    <View className="flex-1">
                      <Text className="text-[15px] font-bold text-primary">{item.title}</Text>
                      <Text className="text-on-surface-variant text-xs mt-0.5">{item.time}</Text>
                      <View className="flex-row items-center gap-2 mt-1">
                        <Text className="text-primary font-bold text-sm">{item.price}</Text>
                        <View className="bg-secondary px-1.5 py-0.5 rounded">
                          <Text className="text-white text-[8px] font-bold">{item.badge}</Text>
                        </View>
                      </View>
                    </View>
                    <TouchableOpacity
                      onPress={() => setHidden((h) => [...h, item.id])}
                      className="p-2"
                    >
                      <MaterialIcons name="close" size={20} color="#44474f" />
                    </TouchableOpacity>
                  </TouchableOpacity>
                ))}
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Bottom Nav Bar */}
      <View className="absolute bottom-6 left-6 right-6 flex-row justify-around items-center px-4 py-3 bg-white/70 backdrop-blur-xl border border-white/30 shadow-lg rounded-full">
        <Link href="/(buyer)/home" className="flex-col items-center justify-center">
          <MaterialIcons name="home" size={22} color="#44474f" />
          <Text className="text-xs font-semibold text-on-surface-variant">Home</Text>
        </Link>
        <Link href="/(buyer)/favorites" className="flex-col items-center justify-center">
          <MaterialIcons name="favorite" size={22} color="#44474f" />
          <Text className="text-xs font-semibold text-on-surface-variant">Favorites</Text>
        </Link>
        <View className="-mt-6">
          <Link href="/(buyer)/home" className="w-16 h-16 bg-primary rounded-full items-center justify-center shadow-lg">
            <MaterialIcons name="search" size={32} color="#fff" />
          </Link>
        </View>
        <Link href="/(buyer)/schedule-appointment" className="flex-col items-center justify-center">
          <MaterialIcons name="calendar-today" size={22} color="#44474f" />
          <Text className="text-xs font-semibold text-on-surface-variant">Appointments</Text>
        </Link>
        <Link href="/(buyer)/history" className="flex-col items-center justify-center">
          <MaterialIcons name="person" size={22} color="#835400" />
          <Text className="text-xs font-bold text-secondary">Profile</Text>
        </Link>
      </View>
    </View>
  );
}
