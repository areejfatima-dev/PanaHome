import { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { Link, useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { signOut } from '@/services/authService';
import { useAuthStore } from '@/store/authStore';

const ACCOUNT = [
  { icon: 'person', label: 'Personal Info', sub: 'Update your details and avatar', showChevron: true },
  { icon: 'lock', label: 'Password', sub: 'Change your account security', showChevron: true },
  { icon: 'security', label: '2FA', sub: 'Two-factor authentication is active', showChevron: false, toggle: true },
];

const PLATFORM = [
  { icon: 'admin-panel-settings', label: 'Manage Admins', sub: 'Control administrator permissions', showChevron: true },
  { icon: 'rule', label: 'Approval Rules', sub: 'Set logic for property verification', showChevron: true },
  { icon: 'notifications-active', label: 'Notifications', sub: 'System alerts and log triggers', showChevron: true },
];

const PREFERENCES = [
  { icon: 'light-mode', label: 'Theme', sub: '', showChevron: false, toggle: false },
];

export default function AdminProfile() {
  const { user, logout } = useAuthStore();
  const router = useRouter();
  const [twoFa, setTwoFa] = useState(true);

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
            <View>
              <Text className="text-[26px] font-bold text-primary">Admin Profile</Text>
              <Text className="text-on-surface-variant text-sm mt-1">Admin Portal</Text>
            </View>
            <TouchableOpacity className="w-10 h-10 items-center justify-center rounded-full bg-surface-container-lowest shadow-sm">
              <MaterialIcons name="notifications" size={22} color="#03224d" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Admin card */}
        <View className="mx-5 mt-5 bg-white rounded-[20px] shadow-sm border border-surface-container-low p-5 flex-row items-center gap-4">
          <View className="w-16 h-16 rounded-full bg-primary items-center justify-center">
            <MaterialIcons name="person" size={32} color="#fff" />
          </View>
          <View className="flex-1">
            <View className="flex-row items-center gap-1.5">
              <Text className="text-lg font-bold text-primary">{user?.fullName || 'Alexander Vance'}</Text>
              <MaterialIcons name="verified" size={15} color="#835400" />
            </View>
            <Text className="text-secondary font-bold text-xs mt-0.5">Platform Administrator</Text>
            <Text className="text-on-surface-variant text-xs mt-0.5">Last login: Today, 08:42 AM</Text>
          </View>
        </View>

        {/* Account */}
        <Text className="px-5 mt-7 text-[16px] font-bold text-primary mb-3">ACCOUNT</Text>
        <View className="mx-5 bg-white rounded-[20px] shadow-sm border border-surface-container-low">
          {ACCOUNT.map((row, i) => (
            <View key={row.label} className={`flex-row items-center px-5 py-4 ${i > 0 ? 'border-t border-surface-container' : ''}`}>
              <View className="w-9 h-9 bg-surface-container-low rounded-[10px] items-center justify-center mr-4">
                <MaterialIcons name={row.icon as any} size={20} color="#835400" />
              </View>
              <View className="flex-1">
                <Text className="text-primary font-semibold">{row.label}</Text>
                <Text className="text-on-surface-variant text-xs mt-0.5">{row.sub}</Text>
              </View>
              {row.toggle ? (
                <Switch
                  value={twoFa}
                  onValueChange={setTwoFa}
                  trackColor={{ false: '#eceef1', true: '#feb64e' }}
                  thumbColor={twoFa ? '#835400' : '#ffffff'}
                />
              ) : (
                <MaterialIcons name="chevron-right" size={20} color="#44474f" />
              )}
            </View>
          ))}
        </View>

        {/* Platform */}
        <Text className="px-5 mt-7 text-[16px] font-bold text-primary mb-3">PLATFORM</Text>
        <View className="mx-5 bg-white rounded-[20px] shadow-sm border border-surface-container-low">
          {PLATFORM.map((row, i) => (
            <View key={row.label} className={`flex-row items-center px-5 py-4 ${i > 0 ? 'border-t border-surface-container' : ''}`}>
              <View className="w-9 h-9 bg-surface-container-low rounded-[10px] items-center justify-center mr-4">
                <MaterialIcons name={row.icon as any} size={20} color="#835400" />
              </View>
              <View className="flex-1">
                <Text className="text-primary font-semibold">{row.label}</Text>
                <Text className="text-on-surface-variant text-xs mt-0.5">{row.sub}</Text>
              </View>
              <MaterialIcons name="chevron-right" size={20} color="#44474f" />
            </View>
          ))}
        </View>

        {/* Preferences */}
        <Text className="px-5 mt-7 text-[16px] font-bold text-primary mb-3">PREFERENCES</Text>
        <View className="mx-5 bg-white rounded-[20px] shadow-sm border border-surface-container-low">
          {PREFERENCES.map((row, i) => (
            <View key={row.label} className="flex-row items-center px-5 py-4">
              <View className="w-9 h-9 bg-surface-container-low rounded-[10px] items-center justify-center mr-4">
                <MaterialIcons name={row.icon as any} size={20} color="#835400" />
              </View>
              <Text className="flex-1 text-primary font-semibold">{row.label}</Text>
              <MaterialIcons name="chevron-right" size={20} color="#44474f" />
            </View>
          ))}
        </View>

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
        <Link href="/(admin)/dashboard" className="flex-col items-center justify-center">
          <MaterialIcons name="dashboard" size={22} color="#44474f" />
          <Text className="text-xs font-semibold text-on-surface-variant">Dashboard</Text>
        </Link>
        <Link href="/(admin)/property-approvals" className="flex-col items-center justify-center">
          <MaterialIcons name="fact-check" size={22} color="#44474f" />
          <Text className="text-xs font-semibold text-on-surface-variant">Approvals</Text>
        </Link>
        <Link href="/(admin)/user-management" className="flex-col items-center justify-center">
          <MaterialIcons name="group" size={22} color="#44474f" />
          <Text className="text-xs font-semibold text-on-surface-variant">Users</Text>
        </Link>
        <Link href="/(admin)/complaint-management" className="flex-col items-center justify-center">
          <MaterialIcons name="report-problem" size={22} color="#44474f" />
          <Text className="text-xs font-semibold text-on-surface-variant">Complaints</Text>
        </Link>
        <Link href="/(admin)/profile" className="flex-col items-center justify-center">
          <MaterialIcons name="settings" size={22} color="#835400" />
          <Text className="text-xs font-bold text-secondary">Settings</Text>
        </Link>
      </View>
    </View>
  );
}
