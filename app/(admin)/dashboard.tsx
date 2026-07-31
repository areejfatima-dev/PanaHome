import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';

const STATS = [
  { icon: 'real-estate-agent', label: 'Total Properties', value: '14,284', trend: '+12%' },
  { icon: 'group', label: 'Total Users', value: '892,103', trend: '+8.4%' },
  { icon: 'fact-check', label: 'Pending Approvals', value: '342', trend: '', warn: true },
  { icon: 'report-problem', label: 'Open Complaints', value: '18', trend: '', warn: true },
];

const AGENTS = [
  { name: 'Alexander Thorne', volume: '$12.4M', listings: '42', rating: '4.9' },
  { name: 'Elena Rodriguez', volume: '$9.8M', listings: '28', rating: '5.0' },
];

const ACTIVITY = [
  { icon: 'warning', color: '#ba1a1a', text: 'Failed login attempt detected from unknown IP (192.168.1.1). Monitoring active.', time: '2 mins ago' },
  { icon: 'person-add', color: '#835400', text: 'Sarah Miller registered as a Luxury Portfolio agent. Verification needed.', time: '15 mins ago' },
  { icon: 'task-alt', color: '#03224d', text: 'Penthouse at 5th Ave has been approved and is now live in the AR gallery.', time: '1 hour ago' },
  { icon: 'report', color: '#ba1a1a', text: 'User #4892 filed a complaint regarding agent listing accuracy.', time: '3 hours ago' },
];

export default function AdminDashboard() {
  return (
    <View className="flex-1 bg-background">
      <ScrollView className="flex-1" contentContainerStyle={{ paddingBottom: 120 }}>
        {/* Header */}
        <View className="px-5 pt-6">
          <View className="flex-row justify-between items-center">
            <Text className="text-[26px] font-bold text-primary">Admin Portal</Text>
            <View className="flex-row gap-2">
              <TouchableOpacity className="w-10 h-10 items-center justify-center rounded-full bg-surface-container-lowest shadow-sm">
                <MaterialIcons name="search" size={22} color="#03224d" />
              </TouchableOpacity>
              <TouchableOpacity className="w-10 h-10 items-center justify-center rounded-full bg-surface-container-lowest shadow-sm">
                <MaterialIcons name="notifications" size={22} color="#03224d" />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Stats grid */}
        <View className="flex-row flex-wrap px-5 mt-5 gap-3">
          {STATS.map((s) => (
            <View key={s.label} className="flex-1 min-w-[47%] bg-white rounded-[18px] shadow-sm border border-surface-container-low p-4">
              <View className="flex-row items-center justify-between">
                <View className="w-9 h-9 bg-surface-container-low rounded-[10px] items-center justify-center">
                  <MaterialIcons name={s.icon as any} size={18} color={s.warn ? '#ba1a1a' : '#835400'} />
                </View>
                {s.trend && (
                  <View className="bg-primary/10 px-1.5 py-0.5 rounded">
                    <Text className="text-primary text-[10px] font-bold">{s.trend}</Text>
                  </View>
                )}
              </View>
              <Text className="text-primary font-bold text-2xl mt-3">{s.value}</Text>
              <Text className="text-on-surface-variant text-xs mt-0.5">{s.label}</Text>
            </View>
          ))}
        </View>

        {/* Critical action items */}
        <View className="mx-5 mt-5 bg-error/10 rounded-[18px] p-5">
          <Text className="text-[16px] font-bold text-primary mb-1">Critical Action Items</Text>
          <Text className="text-on-surface-variant text-sm">
            You have <Text className="font-bold text-error">12 high-priority KYC</Text> verifications pending for VIP sellers.
          </Text>
          <View className="flex-row gap-3 mt-4">
            <TouchableOpacity className="flex-1 py-3 bg-primary rounded-full items-center">
              <Text className="text-on-primary font-semibold text-sm">Process All</Text>
            </TouchableOpacity>
            <TouchableOpacity className="flex-1 py-3 border border-primary rounded-full items-center">
              <Text className="text-primary font-semibold text-sm">View Queue</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Platform growth */}
        <View className="mx-5 mt-5 bg-white rounded-[20px] shadow-sm border border-surface-container-low p-5">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-[16px] font-bold text-primary">Platform Growth</Text>
            <View className="flex-row gap-2">
              <TouchableOpacity className="bg-primary px-3 py-1.5 rounded-full"><Text className="text-on-primary text-[10px] font-bold">Last 30 Days</Text></TouchableOpacity>
              <TouchableOpacity className="bg-surface-container-low px-3 py-1.5 rounded-full"><Text className="text-on-surface-variant text-[10px] font-bold">Last 90 Days</Text></TouchableOpacity>
            </View>
          </View>
          <View className="flex-row items-end justify-between h-32 px-1">
            {[40, 70, 55, 90].map((h, i) => (
              <View key={i} className="flex-1 mx-1 items-center gap-2">
                <View className={`w-full rounded-t ${i === 2 ? 'bg-secondary' : 'bg-primary/70'}`} style={{ height: `${h}%` }} />
                <Text className="text-outline text-[10px]">W{i + 1}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* User distribution */}
        <View className="mx-5 mt-5 bg-white rounded-[20px] shadow-sm border border-surface-container-low p-5">
          <Text className="text-[16px] font-bold text-primary mb-4">User Distribution</Text>
          <View className="flex-row items-center gap-4">
            <View className="w-20 h-20 rounded-full border-4 border-secondary items-center justify-center">
              <Text className="text-secondary font-extrabold text-lg">62%</Text>
            </View>
            <View className="flex-1 gap-2">
              <View className="flex-row items-center gap-2">
                <View className="w-3 h-3 rounded-full bg-secondary" />
                <Text className="flex-1 text-on-surface-variant text-xs">Buyers</Text>
                <Text className="text-primary font-bold text-xs">553,104 Users</Text>
              </View>
              <View className="flex-row items-center gap-2">
                <View className="w-3 h-3 rounded-full bg-primary/70" />
                <Text className="flex-1 text-on-surface-variant text-xs">Sellers</Text>
                <Text className="text-primary font-bold text-xs">338,999 Users</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Top agents */}
        <View className="px-5 mt-6">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-[16px] font-bold text-primary">Top Performing Agents</Text>
            <TouchableOpacity><Text className="text-secondary font-semibold text-sm">View All</Text></TouchableOpacity>
          </View>
          <View className="gap-3">
            {AGENTS.map((a) => (
              <View key={a.name} className="bg-white rounded-[18px] shadow-sm border border-surface-container-low p-4 flex-row items-center gap-3">
                <View className="w-11 h-11 rounded-full bg-surface-container-high items-center justify-center">
                  <MaterialIcons name="person" size={22} color="#03224d" />
                </View>
                <View className="flex-1">
                  <Text className="text-primary font-bold text-sm">{a.name}</Text>
                  <Text className="text-on-surface-variant text-xs">Active Listings: {a.listings}</Text>
                </View>
                <View className="items-end">
                  <Text className="text-primary font-bold text-sm">{a.volume}</Text>
                  <View className="flex-row items-center gap-0.5">
                    <MaterialIcons name="star" size={12} color="#835400" />
                    <Text className="text-primary font-bold text-xs">{a.rating}</Text>
                  </View>
                </View>
                <MaterialIcons name="more-vert" size={18} color="#44474f" />
              </View>
            ))}
          </View>
        </View>

        {/* Recent activity */}
        <View className="px-5 mt-6">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-[16px] font-bold text-primary">Recent Activity</Text>
            <TouchableOpacity><Text className="text-secondary font-semibold text-sm">Export Activity Logs</Text></TouchableOpacity>
          </View>
          <View className="bg-white rounded-[20px] shadow-sm border border-surface-container-low p-2">
            {ACTIVITY.map((a, i) => (
              <View key={i} className={`flex-row items-start gap-3 p-3 ${i > 0 ? 'border-t border-surface-container' : ''}`}>
                <View className={`w-9 h-9 rounded-full items-center justify-center ${a.color === '#ba1a1a' ? 'bg-error/10' : 'bg-surface-container-low'}`}>
                  <MaterialIcons name={a.icon as any} size={18} color={a.color} />
                </View>
                <View className="flex-1">
                  <Text className="text-on-surface-variant text-xs leading-4">{a.text}</Text>
                  <Text className="text-outline text-[10px] mt-1">{a.time}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Bottom Nav Bar */}
      <View className="absolute bottom-6 left-6 right-6 flex-row justify-around items-center px-4 py-3 bg-white/70 backdrop-blur-xl border border-white/30 shadow-lg rounded-full">
        <Link href="/(admin)/dashboard" className="flex-col items-center justify-center">
          <MaterialIcons name="dashboard" size={22} color="#835400" />
          <Text className="text-xs font-bold text-secondary">Dashboard</Text>
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
          <MaterialIcons name="settings" size={22} color="#44474f" />
          <Text className="text-xs font-semibold text-on-surface-variant">Settings</Text>
        </Link>
      </View>
    </View>
  );
}
