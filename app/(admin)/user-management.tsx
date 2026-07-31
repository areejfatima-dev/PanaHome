import { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const TABS = ['All', 'Sellers', 'Buyers', 'Suspended'];

const USERS = [
  {
    id: '1',
    name: 'Alexander Sterling',
    email: 'a.sterling@estate.com',
    role: 'Seller',
    status: 'Active',
    joined: 'Oct 12, 2023',
  },
  {
    id: '2',
    name: 'Elena Rodriguez',
    email: 'elena.rod@globalview.io',
    role: 'Buyer',
    status: 'Suspended',
    joined: 'Nov 03, 2023',
  },
  {
    id: '3',
    name: 'Jordan Wu',
    email: 'j.wu@urbanliving.com',
    role: 'Seller',
    status: 'Active',
    joined: 'Jan 15, 2024',
  },
];

export default function UserManagement() {
  const [tab, setTab] = useState('All');
  const [selected, setSelected] = useState<string | null>('Alexander Sterling');

  return (
    <View className="flex-1 bg-background">
      <ScrollView className="flex-1" contentContainerStyle={{ paddingBottom: 40 }}>
        {/* Header */}
        <View className="px-5 pt-6">
          <View className="flex-row justify-between items-center">
            <View>
              <Text className="text-[26px] font-bold text-primary">User Management</Text>
              <Text className="text-on-surface-variant text-sm mt-1">Manage and monitor platform participants</Text>
            </View>
            <View className="flex-row gap-2">
              <TouchableOpacity className="w-10 h-10 items-center justify-center rounded-full bg-surface-container-lowest shadow-sm">
                <MaterialIcons name="notifications" size={22} color="#03224d" />
              </TouchableOpacity>
              <TouchableOpacity className="w-10 h-10 items-center justify-center rounded-full bg-surface-container-lowest shadow-sm">
                <MaterialIcons name="dark-mode" size={22} color="#03224d" />
              </TouchableOpacity>
            </View>
          </View>
          {/* Search */}
          <View className="flex-row items-center bg-white rounded-full border border-surface-container px-4 py-3 mt-4">
            <MaterialIcons name="search" size={20} color="#747780" />
            <TextInput placeholder="Search users..." placeholderTextColor="#747780" className="flex-1 ml-2 text-sm text-on-surface" />
          </View>
        </View>

        {/* Tabs */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mt-5" contentContainerStyle={{ paddingHorizontal: 20, gap: 10 }}>
          {TABS.map((t) => (
            <TouchableOpacity
              key={t}
              onPress={() => setTab(t)}
              className={`px-5 py-2.5 rounded-full ${tab === t ? 'bg-primary' : 'bg-white border border-surface-container'}`}
            >
              <Text className={`text-sm font-semibold ${tab === t ? 'text-on-primary' : 'text-on-surface-variant'}`}>{t}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* User list */}
        <View className="px-5 mt-5 gap-3">
          {USERS.map((u) => (
            <TouchableOpacity
              key={u.id}
              onPress={() => setSelected(u.name)}
              className={`bg-white p-4 rounded-[20px] shadow-sm border ${
                selected === u.name ? 'border-primary' : 'border-surface-container-low'
              }`}
            >
              <View className="flex-row items-center gap-3">
                <View className="w-12 h-12 rounded-full bg-surface-container-high items-center justify-center">
                  <MaterialIcons name="person" size={24} color="#03224d" />
                </View>
                <View className="flex-1">
                  <Text className="text-[14px] font-bold text-primary">{u.name}</Text>
                  <Text className="text-on-surface-variant text-xs">{u.email}</Text>
                  <View className="flex-row items-center gap-2 mt-1.5">
                    <Text className="text-on-surface-variant text-[10px]">{u.role}</Text>
                    <Text className="text-outline text-[10px]">•</Text>
                    <View className={`px-2 py-0.5 rounded-full ${u.status === 'Active' ? 'bg-primary/10' : 'bg-error/10'}`}>
                      <Text className={`text-[9px] font-bold ${u.status === 'Active' ? 'text-primary' : 'text-error'}`}>{u.status}</Text>
                    </View>
                    <Text className="text-outline text-[10px]">• {u.joined}</Text>
                  </View>
                </View>
                <MaterialIcons name="more-vert" size={20} color="#44474f" />
              </View>
            </TouchableOpacity>
          ))}
          <Text className="text-center text-outline text-xs mt-2">Showing 1-10 of 892,103</Text>
        </View>

        {/* Selected user summary */}
        <View className="mx-5 mt-6 bg-white rounded-[20px] shadow-sm border border-surface-container-low p-5">
          <Text className="text-[16px] font-bold text-primary mb-4">Activity Summary</Text>
          <View className="flex-row justify-between mb-4">
            <View>
              <Text className="text-on-surface-variant text-xs">Total Listings</Text>
              <Text className="text-primary font-bold text-xl">24</Text>
            </View>
            <View>
              <Text className="text-on-surface-variant text-xs">AR Views</Text>
              <Text className="text-primary font-bold text-xl">1.2k</Text>
            </View>
            <View>
              <Text className="text-on-surface-variant text-xs">Status</Text>
              <Text className="text-primary font-bold text-xl">Active</Text>
            </View>
          </View>
          <View className="bg-surface-container-low rounded-[14px] p-4 mb-1">
            <Text className="text-[13px] font-bold text-primary mb-1">Complaint History</Text>
            <Text className="text-on-surface-variant text-xs">
              <Text className="text-primary font-bold">Inaccurate property description</Text> — <Text className="text-primary font-bold">RESOLVED</Text>
            </Text>
            <Text className="text-on-surface-variant text-xs mt-1">No other complaints found.</Text>
          </View>
          <View className="flex-row gap-3 mt-4">
            <TouchableOpacity className="flex-1 py-3.5 border-2 border-primary rounded-full items-center">
              <Text className="text-primary font-semibold">Edit Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity className="flex-1 py-3.5 bg-error rounded-full items-center">
              <Text className="text-white font-semibold">Suspend User</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
