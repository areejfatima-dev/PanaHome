import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';

const STATS = [
  { icon: 'domain', label: 'Live Active Listings', value: '12', color: '#03224d' },
  { icon: 'trending-up', label: 'Total Views', value: '4.2k', trend: '+14%', color: '#835400' },
  { icon: 'calendar-today', label: 'Pending Apps', value: '08', color: '#03224d' },
  { icon: 'report-problem', label: 'Open Complaints', value: '02', color: '#ba1a1a' },
];

const LISTINGS = [
  { title: 'Skyline Penthouse - Unit 402', location: 'Upper East Side, NY', status: 'Active', views: '1,240 views', icon: 'visibility' },
  { title: 'The Azure Estate', location: 'Hamptons, NY', status: 'Pending', views: '890 views', icon: 'visibility' },
  { title: 'Brick-Alley Industrial Loft', location: 'Brooklyn, NY', status: 'Rejected', views: 'Document missing', icon: 'info' },
];

export default function SellerDashboard() {
  return (
    <View className="flex-1 bg-background">
      <ScrollView className="flex-1" contentContainerStyle={{ paddingBottom: 40 }}>
        {/* Header */}
        <View className="px-5 pt-6">
          <View className="flex-row justify-between items-center">
            <View>
              <Text className="text-[22px] font-bold text-primary">Welcome back, Alexander</Text>
              <Text className="text-on-surface-variant text-sm mt-0.5">Here{`'`}s your portfolio today</Text>
            </View>
            <TouchableOpacity className="w-10 h-10 items-center justify-center rounded-full bg-surface-container-lowest shadow-sm">
              <MaterialIcons name="notifications" size={22} color="#03224d" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Quick actions */}
        <View className="flex-row gap-3 px-5 mt-5">
          <Link href="/(seller)/add-property/step-1-basic" className="flex-1 bg-primary rounded-[18px] p-4 flex-row items-center gap-3 shadow-lg">
            <MaterialIcons name="add" size={22} color="#fff" />
            <Text className="text-on-primary font-bold">Add Property</Text>
          </Link>
          <Link href="/(seller)/availability-settings" className="flex-1 bg-secondary rounded-[18px] p-4 flex-row items-center gap-3 shadow-lg">
            <MaterialIcons name="event-available" size={22} color="#fff" />
            <Text className="text-on-secondary font-bold">Set Availability</Text>
          </Link>
          <Link href="/(seller)/analytics" className="flex-1 bg-white border border-surface-container rounded-[18px] p-4 flex-row items-center gap-3">
            <MaterialIcons name="insights" size={22} color="#835400" />
            <Text className="text-primary font-bold">Analytics</Text>
          </Link>
        </View>

        {/* Stats grid */}
        <View className="flex-row flex-wrap px-5 mt-4 gap-3">
          {STATS.map((s) => (
            <View key={s.label} className="flex-1 min-w-[47%] bg-white rounded-[18px] shadow-sm border border-surface-container-low p-4">
              <View className="flex-row items-center gap-2">
                <MaterialIcons name={s.icon as any} size={18} color={s.color} />
                <Text className="text-on-surface-variant text-xs flex-1">{s.label}</Text>
              </View>
              <View className="flex-row items-center gap-2 mt-3">
                <Text className="text-primary font-bold text-2xl">{s.value}</Text>
                {s.trend && (
                  <View className="bg-primary/10 px-1.5 py-0.5 rounded">
                    <Text className="text-primary text-[10px] font-bold">{s.trend}</Text>
                  </View>
                )}
              </View>
            </View>
          ))}
        </View>

        {/* Your Listings */}
        <View className="px-5 mt-8">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-[20px] font-bold text-primary">Your Listings</Text>
            <TouchableOpacity>
              <Text className="text-secondary font-semibold text-sm">View All</Text>
            </TouchableOpacity>
          </View>
          <View className="gap-3">
            {LISTINGS.map((l) => (
              <TouchableOpacity
                key={l.title}
                className="bg-white p-4 rounded-[20px] shadow-sm border border-surface-container-low"
              >
                <View className="flex-row items-start gap-3">
                  <View className="w-14 h-14 rounded-[12px] bg-surface-container-high items-center justify-center">
                    <MaterialIcons name="apartment" size={26} color="#747780" />
                  </View>
                  <View className="flex-1">
                    <Text className="text-[14px] font-bold text-primary flex-shrink">{l.title}</Text>
                    <Text className="text-on-surface-variant text-xs mt-0.5">{l.location}</Text>
                    <View className="flex-row items-center gap-2 mt-2">
                      {l.status === 'Active' && <View className="bg-primary/10 px-2 py-0.5 rounded-full"><Text className="text-primary text-[10px] font-bold">Active</Text></View>}
                      {l.status === 'Pending' && <View className="bg-secondary-container px-2 py-0.5 rounded-full"><Text className="text-on-secondary-container text-[10px] font-bold">Pending</Text></View>}
                      {l.status === 'Rejected' && <View className="bg-error/10 px-2 py-0.5 rounded-full"><Text className="text-error text-[10px] font-bold">Rejected</Text></View>}
                      <Text className="flex-row items-center text-on-surface-variant text-[10px]">
                        <MaterialIcons name={l.icon as any} size={12} color="#747780" /> {l.views}
                      </Text>
                    </View>
                  </View>
                  <MaterialIcons name="chevron-right" size={20} color="#44474f" />
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Bottom Nav Bar */}
      <View className="absolute bottom-6 left-6 right-6 flex-row justify-around items-center px-4 py-3 bg-white/70 backdrop-blur-xl border border-white/30 shadow-lg rounded-full">
        <Link href="/(seller)/dashboard" className="flex-col items-center justify-center">
          <MaterialIcons name="dashboard" size={22} color="#835400" />
          <Text className="text-xs font-bold text-secondary">Dashboard</Text>
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
          <MaterialIcons name="person" size={22} color="#44474f" />
          <Text className="text-xs font-semibold text-on-surface-variant">Profile</Text>
        </Link>
      </View>
    </View>
  );
}
