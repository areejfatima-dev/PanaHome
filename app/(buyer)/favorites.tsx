import { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';

const SAVED = [
  {
    id: '1',
    title: "Lumière Heights",
    price: '$2,450,000',
    location: 'Bel Air, Los Angeles',
    beds: 4,
    baths: 5,
    sqft: '4.2k',
    badge: 'AI-Verified',
  },
  {
    id: '2',
    title: 'Obsidian Loft',
    price: '$1,890,000',
    location: 'Tribeca, New York',
    beds: 2,
    baths: 2,
    sqft: '1.8k',
    badge: 'New Listing',
  },
  {
    id: '3',
    title: 'Azure Marina',
    price: '$5,200,000',
    location: 'Coral Gables, Miami',
    beds: 6,
    baths: 8,
    sqft: '8.5k',
    badge: 'AI-Verified',
  },
  {
    id: '4',
    title: 'Alpine Retreat',
    price: '$1,150,000',
    location: 'Aspen, Colorado',
    beds: 3,
    baths: 3,
    sqft: '2.4k',
    badge: 'AI-Verified',
  },
];

const TABS = ['All', 'Houses', 'Apartments', 'Commercial'];

export default function Favorites() {
  const [activeTab, setActiveTab] = useState('All');

  return (
    <View className="flex-1 bg-background">
      <ScrollView className="flex-1" contentContainerStyle={{ paddingBottom: 120 }}>
        {/* Header */}
        <View className="px-5 pt-6">
          <View className="flex-row justify-between items-center">
            <View>
              <Text className="text-[26px] font-bold text-primary">Your Favorites</Text>
              <Text className="text-on-surface-variant text-sm mt-1">12 Saved</Text>
            </View>
            <TouchableOpacity className="w-10 h-10 items-center justify-center rounded-full bg-surface-container-lowest shadow-sm">
              <MaterialIcons name="notifications" size={22} color="#03224d" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Tabs */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="mt-5"
          contentContainerStyle={{ paddingHorizontal: 20, gap: 10 }}
        >
          {TABS.map((tab) => (
            <TouchableOpacity
              key={tab}
              onPress={() => setActiveTab(tab)}
              className={`px-5 py-2.5 rounded-full ${
                activeTab === tab ? 'bg-primary' : 'bg-white border border-surface-container'
              }`}
            >
              <Text
                className={`text-sm font-semibold ${
                  activeTab === tab ? 'text-on-primary' : 'text-on-surface-variant'
                }`}
              >
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Saved cards */}
        <View className="mt-6 px-5 gap-4">
          {SAVED.map((p) => (
            <TouchableOpacity
              key={p.id}
              className="flex-row items-center gap-4 bg-white p-3 rounded-[20px] shadow-sm border border-surface-container-low"
            >
              <View className="w-24 h-24 rounded-[16px] bg-surface-container-high items-center justify-center relative">
                <MaterialIcons name="house" size={32} color="#747780" />
                <View className="absolute top-2 left-2 bg-secondary px-1.5 py-0.5 rounded">
                  <Text className="text-white text-[8px] font-bold">{p.badge}</Text>
                </View>
              </View>
              <View className="flex-1 py-1">
                <Text className="text-base font-bold text-primary">{p.title}</Text>
                <Text className="text-on-surface-variant text-xs mt-0.5">{p.price}</Text>
                <Text className="flex-row items-center text-on-surface-variant text-xs mt-1">
                  <MaterialIcons name="location-on" size={14} color="#44474f" /> {p.location}
                </Text>
                <View className="flex-row gap-3 mt-2 text-on-surface-variant">
                  <Text className="flex-row items-center gap-1 text-xs">
                    <MaterialIcons name="bed" size={15} color="#44474f" /> {p.beds}
                  </Text>
                  <Text className="flex-row items-center gap-1 text-xs">
                    <MaterialIcons name="bathtub" size={15} color="#44474f" /> {p.baths}
                  </Text>
                  <Text className="flex-row items-center gap-1 text-xs">
                    <MaterialIcons name="square-foot" size={15} color="#44474f" /> {p.sqft}
                  </Text>
                </View>
              </View>
              <MaterialIcons name="chevron-right" size={24} color="#44474f" />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Bottom Nav Bar */}
      <View className="absolute bottom-6 left-6 right-6 flex-row justify-around items-center px-4 py-3 bg-white/70 backdrop-blur-xl border border-white/30 shadow-lg rounded-full">
        <Link href="/(buyer)/home" className="flex-col items-center justify-center">
          <MaterialIcons name="home" size={22} color="#44474f" />
          <Text className="text-xs font-semibold text-on-surface-variant">Home</Text>
        </Link>
        <Link href="/(buyer)/favorites" className="flex-col items-center justify-center">
          <MaterialIcons name="favorite" size={22} color="#835400" />
          <Text className="text-xs font-bold text-secondary">Favorites</Text>
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
          <MaterialIcons name="person" size={22} color="#44474f" />
          <Text className="text-xs font-semibold text-on-surface-variant">Profile</Text>
        </Link>
      </View>
    </View>
  );
}
