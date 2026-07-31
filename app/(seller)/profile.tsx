import { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { Link } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { useAuthStore } from '@/store/authStore';

const SETTINGS = [
  { icon: 'domain', label: 'Agency Details', showChevron: true },
  { icon: 'payments', label: 'Payout Methods', showChevron: true },
  { icon: 'verified-user', label: 'Verification Status', value: 'Verified', showChevron: true },
  { icon: 'dark-mode', label: 'Dark Mode', showChevron: false },
  { icon: 'notifications-active', label: 'Notifications', showChevron: true },
  { icon: 'translate', label: 'Language', value: 'English (US)', showChevron: true },
];

const LISTINGS = [
  { icon: 'apartment', label: 'My Listings', showChevron: true },
  { icon: 'edit-document', label: 'Drafts', showChevron: true },
  { icon: 'event-available', label: 'Availability', showChevron: true },
];

const SUPPORT = [
  { icon: 'help', label: 'Help Center', showChevron: true },
  { icon: 'contact-support', label: 'Contact Us', showChevron: true },
];

export default function SellerProfile() {
  const { user, logout } = useAuthStore();
  const [darkMode, setDarkMode] = useState(false);

  return (
    <View className="flex-1 bg-background">
      <ScrollView className="flex-1" contentContainerStyle={{ paddingBottom: 120 }}>
        {/* Header */}
        <View className="px-5 pt-6">
          <View className="flex-row justify-between items-center">
            <Text className="text-[26px] font-bold text-primary">Profile</Text>
            <View className="flex-row gap-2">
              <TouchableOpacity className="w-10 h-10 items-center justify-center rounded-full bg-surface-container-lowest shadow-sm">
                <MaterialIcons name="settings" size={22} color="#03224d" />
              </TouchableOpacity>
              <TouchableOpacity className="w-10 h-10 items-center justify-center rounded-full bg-surface-container-lowest shadow-sm">
                <MaterialIcons name="notifications" size={22} color="#03224d" />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Seller card */}
        <View className="mx-5 mt-5 bg-white rounded-[20px] shadow-sm border border-surface-container-low p-5 flex-row items-center gap-4">
          <View className="w-20 h-20 rounded-full bg-surface-container-high items-center justify-center">
            <MaterialIcons name="person" size={38} color="#03224d" />
          </View>
          <View className="flex-1">
            <View className="flex-row items-center gap-1.5">
              <Text className="text-lg font-bold text-primary">{user?.fullName?.split(' ')[0] || 'Julian'}</Text>
              <MaterialIcons name="verified" size={15} color="#835400" />
            </View>
            <Text className="text-on-surface-variant text-xs mt-0.5">{user?.fullName || 'Julian Montgomery'}</Text>
            <Text className="text-secondary font-bold text-xs mt-0.5">Apex Prime Realty Group</Text>
            <View className="flex-row items-center gap-4 mt-2">
              <Text className="text-on-surface-variant text-xs"><Text className="font-bold text-primary">24</Text> Active</Text>
              <View className="flex-row items-center gap-0.5">
                <MaterialIcons name="star" size={13} color="#835400" />
                <Text className="text-primary font-bold text-xs">4.9</Text>
              </View>
            </View>
          </View>
          <TouchableOpacity className="w-10 h-10 bg-primary rounded-full items-center justify-center">
            <MaterialIcons name="edit" size={18} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* Business */}
        <Text className="px-5 mt-7 text-[16px] font-bold text-primary mb-3">Business</Text>
        <View className="mx-5 bg-white rounded-[20px] shadow-sm border border-surface-container-low">
          {SETTINGS.map((row, i) => (
            <View key={row.label} className={`flex-row items-center px-5 py-4 ${i > 0 ? 'border-t border-surface-container' : ''}`}>
              <View className="w-9 h-9 bg-surface-container-low rounded-[10px] items-center justify-center mr-4">
                <MaterialIcons name={row.icon as any} size={20} color="#835400" />
              </View>
              <Text className="flex-1 text-primary font-semibold">{row.label}</Text>
              {row.showChevron ? (
                <View className="flex-row items-center">
                  {row.value && <Text className="text-on-surface-variant text-sm mr-1">{row.value}</Text>}
                  <MaterialIcons name="chevron-right" size={20} color="#44474f" />
                </View>
              ) : (
                <Switch
                  value={darkMode}
                  onValueChange={setDarkMode}
                  trackColor={{ false: '#eceef1', true: '#feb64e' }}
                  thumbColor={darkMode ? '#835400' : '#ffffff'}
                />
              )}
            </View>
          ))}
        </View>

        {/* Listings */}
        <Text className="px-5 mt-7 text-[16px] font-bold text-primary mb-3">Listings</Text>
        <View className="mx-5 bg-white rounded-[20px] shadow-sm border border-surface-container-low">
          {LISTINGS.map((row, i) => (
            <View key={row.label} className={`flex-row items-center px-5 py-4 ${i > 0 ? 'border-t border-surface-container' : ''}`}>
              <View className="w-9 h-9 bg-surface-container-low rounded-[10px] items-center justify-center mr-4">
                <MaterialIcons name={row.icon as any} size={20} color="#835400" />
              </View>
              <Text className="flex-1 text-primary font-semibold">{row.label}</Text>
              <MaterialIcons name="chevron-right" size={20} color="#44474f" />
            </View>
          ))}
        </View>

        {/* Support */}
        <Text className="px-5 mt-7 text-[16px] font-bold text-primary mb-3">Support</Text>
        <View className="mx-5 bg-white rounded-[20px] shadow-sm border border-surface-container-low">
          {SUPPORT.map((row, i) => (
            <View key={row.label} className={`flex-row items-center px-5 py-4 ${i > 0 ? 'border-t border-surface-container' : ''}`}>
              <View className="w-9 h-9 bg-surface-container-low rounded-[10px] items-center justify-center mr-4">
                <MaterialIcons name={row.icon as any} size={20} color="#835400" />
              </View>
              <Text className="flex-1 text-primary font-semibold">{row.label}</Text>
              <MaterialIcons name="chevron-right" size={20} color="#44474f" />
            </View>
          ))}
        </View>

        <TouchableOpacity
          onPress={() => logout()}
          className="mx-5 mt-6 py-4 bg-white border-2 border-error/20 rounded-full items-center flex-row justify-center"
        >
          <MaterialIcons name="logout" size={18} color="#ba1a1a" style={{ marginRight: 8 }} />
          <Text className="text-error font-semibold">Log Out</Text>
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
          <MaterialIcons name="calendar-today" size={22} color="#44474f" />
          <Text className="text-xs font-semibold text-on-surface-variant">Availability</Text>
        </Link>
        <Link href="/(seller)/profile" className="flex-col items-center justify-center">
          <MaterialIcons name="person" size={22} color="#835400" />
          <Text className="text-xs font-bold text-secondary">Profile</Text>
        </Link>
      </View>
    </View>
  );
}
