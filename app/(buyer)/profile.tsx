import { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Switch, Image } from 'react-native';
import { Link, useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { signOut } from '@/services/authService';
import { useAuthStore } from '@/store/authStore';

const ROWS = [
  { icon: 'person', label: 'Personal Info', value: '', showChevron: true },
  { icon: 'security', label: 'Security', value: '', showChevron: true },
  { icon: 'dark-mode', label: 'Dark Mode', value: '', showChevron: false },
  { icon: 'language', label: 'Language', value: 'English', showChevron: true },
];

const ACTIVITY = [
  { icon: 'favorite', label: 'Favorites', value: '24 Properties' },
  { icon: 'history', label: 'History', value: '12 Viewed' },
  { icon: 'calendar-today', label: 'Appointments', value: '3 Upcoming' },
  { icon: 'report-problem', label: 'Complaints', value: '0 Active' },
];

const SUPPORT = [
  { icon: 'help-center', label: 'Help Center', external: true },
  { icon: 'policy', label: 'Privacy Policy', external: true },
];

export default function Profile() {
  const { user, logout } = useAuthStore();
  const router = useRouter();
  const [darkMode, setDarkMode] = useState(false);
  const roleLabel = user?.role
    ? `${user.role[0].toUpperCase()}${user.role.slice(1)} Account`
    : 'Account';

  const handleLogout = async () => {
    try {
      await signOut();
    } catch (e: any) {
      console.warn('Sign out error:', e?.message);
    } finally {
      logout();
      router.replace('/(auth)/login');
    }
  };

  return (
    <View className="flex-1 bg-background">
      <ScrollView className="flex-1" contentContainerStyle={{ paddingBottom: 120 }}>
        {/* Header */}
        <View className="px-5 pt-6">
          <View className="flex-row justify-between items-center">
            <View className="flex-row items-center gap-3">
              <View className="w-10 h-10 rounded-full bg-surface-container-high ring-2 ring-primary/10 items-center justify-center">
                <MaterialIcons name="person" size={22} color="#03224d" />
              </View>
              <Text className="text-[24px] font-bold text-primary">Hi {user?.fullName?.split(' ')[0] || 'there'} 🎧</Text>
            </View>
            <TouchableOpacity className="w-10 h-10 items-center justify-center rounded-full bg-surface-container-lowest shadow-sm">
              <MaterialIcons name="notifications" size={22} color="#03224d" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Account card */}
        <View className="mx-5 mt-5 bg-white rounded-[20px] shadow-sm border border-surface-container-low p-5 items-center">
          {user?.avatar ? (
            <Image source={{ uri: user.avatar }} className="w-20 h-20 rounded-full mb-3" resizeMode="cover" />
          ) : (
            <View className="w-20 h-20 rounded-full bg-surface-container-high items-center justify-center mb-3">
              <MaterialIcons name="person" size={40} color="#03224d" />
            </View>
          )}
          <Text className="text-xl font-bold text-primary">{user?.fullName || 'User'}</Text>
          <Text className="text-xs font-semibold text-secondary mt-0.5">{roleLabel}</Text>
          <TouchableOpacity className="mt-4 py-2.5 px-5 bg-surface-container-low rounded-full flex-row items-center gap-2">
            <MaterialIcons name="edit" size={16} color="#03224d" />
            <Text className="text-primary font-semibold text-sm">Edit Profile</Text>
          </TouchableOpacity>
        </View>

        {/* Settings rows */}
        <View className="mx-5 mt-6 bg-white rounded-[20px] shadow-sm border border-surface-container-low">
          {ROWS.map((row, i) => (
            <View
              key={row.label}
              className={`flex-row items-center px-5 py-4 ${i > 0 ? 'border-t border-surface-container' : ''}`}
            >
              <View className="w-9 h-9 bg-surface-container-low rounded-[10px] items-center justify-center mr-4">
                <MaterialIcons name={row.icon as any} size={20} color="#835400" />
              </View>
              <Text className="flex-1 text-primary font-semibold">{row.label}</Text>
              {row.showChevron ? (
                <View className="flex-row items-center">
                  {row.value ? <Text className="text-on-surface-variant text-sm mr-1">{row.value}</Text> : null}
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

        {/* Activity */}
        <Text className="px-5 mt-7 text-[18px] font-bold text-primary mb-3">Activity</Text>
        <View className="flex-row flex-wrap px-5 gap-3">
          {ACTIVITY.map((a) => (
            <TouchableOpacity
              key={a.label}
              className="flex-1 min-w-[47%] bg-white rounded-[20px] shadow-sm border border-surface-container-low p-4 flex-row items-center gap-3"
            >
              <View className="w-10 h-10 bg-surface-container-low rounded-full items-center justify-center">
                <MaterialIcons name={a.icon as any} size={20} color="#835400" />
              </View>
              <View>
                <Text className="text-primary font-bold text-base">{a.value}</Text>
                <Text className="text-on-surface-variant text-xs">{a.label}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Support */}
        <Text className="px-5 mt-7 text-[18px] font-bold text-primary mb-3">Support</Text>
        <View className="mx-5 bg-white rounded-[20px] shadow-sm border border-surface-container-low">
          {SUPPORT.map((s, i) => (
            <View key={s.label} className={`flex-row items-center px-5 py-4 ${i > 0 ? 'border-t border-surface-container' : ''}`}>
              <View className="w-9 h-9 bg-surface-container-low rounded-[10px] items-center justify-center mr-4">
                <MaterialIcons name={s.icon as any} size={20} color="#835400" />
              </View>
              <Text className="flex-1 text-primary font-semibold">{s.label}</Text>
              <MaterialIcons name="open-in-new" size={18} color="#44474f" />
            </View>
          ))}
        </View>

        {/* Logout */}
        <TouchableOpacity
          onPress={handleLogout}
          className="mx-5 mt-6 py-4 bg-white border-2 border-error/20 rounded-full items-center flex-row justify-center"
        >
          <MaterialIcons name="logout" size={18} color="#ba1a1a" style={{ marginRight: 8 }} />
          <Text className="text-error font-semibold">Log Out</Text>
        </TouchableOpacity>
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
          <Link href="/(buyer)/ai-assistant" className="w-16 h-16 bg-primary rounded-full items-center justify-center shadow-lg">
            <MaterialIcons name="search" size={32} color="#fff" />
          </Link>
        </View>
        <Link href="/(buyer)/schedule-appointment" className="flex-col items-center justify-center">
          <MaterialIcons name="calendar-today" size={22} color="#44474f" />
          <Text className="text-xs font-semibold text-on-surface-variant">Appointments</Text>
        </Link>
        <Link href="/(buyer)/profile" className="flex-col items-center justify-center">
          <MaterialIcons name="person" size={22} color="#835400" />
          <Text className="text-xs font-bold text-secondary">Profile</Text>
        </Link>
      </View>
    </View>
  );
}
