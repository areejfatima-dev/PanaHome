import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';

const METRICS = [
  { label: 'Views', value: '24.5k', trend: '+12%' },
  { label: 'Inquiries', value: '1,248', trend: '-3%' },
  { label: 'Favorites', value: '892', trend: '+42%' },
  { label: 'Viewings', value: 'New 124', trend: '' },
];

const WEEK = [
  { day: 'Mon', v: 40 },
  { day: 'Tue', v: 65 },
  { day: 'Wed', v: 55 },
  { day: 'Thu', v: 80 },
  { day: 'Fri', v: 70 },
  { day: 'Sat', v: 100 },
  { day: 'Sun', v: 45 },
];

const SOURCES = [
  { label: 'Zillow / Realtor', pct: 45, color: '#03224d' },
  { label: 'Direct Search', pct: 30, color: '#835400' },
  { label: 'Social Media', pct: 25, color: '#feb64e' },
];

export default function SellerAnalytics() {
  return (
    <View className="flex-1 bg-background">
      <ScrollView className="flex-1" contentContainerStyle={{ paddingBottom: 40 }}>
        {/* Header */}
        <View className="px-5 pt-6">
          <View className="flex-row justify-between items-center">
            <Text className="text-[26px] font-bold text-primary">Listing Analytics</Text>
            <View className="flex-row gap-2">
              <TouchableOpacity className="w-10 h-10 items-center justify-center rounded-full bg-surface-container-lowest shadow-sm">
                <MaterialIcons name="file-download" size={22} color="#03224d" />
              </TouchableOpacity>
              <TouchableOpacity className="w-10 h-10 items-center justify-center rounded-full bg-surface-container-lowest shadow-sm">
                <MaterialIcons name="notifications" size={22} color="#03224d" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Property selector */}
          <TouchableOpacity className="flex-row items-center justify-between mt-4 bg-white rounded-full border border-surface-container px-4 py-3">
            <Text className="text-primary font-semibold text-sm">Penthouse - Skyline Heights</Text>
            <MaterialIcons name="unfold-more" size={20} color="#44474f" />
          </TouchableOpacity>

          {/* Range chips */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mt-4" contentContainerStyle={{ gap: 8 }}>
            {['Last 30 Days', 'Quarterly', 'Year to Date', 'All Time'].map((r, i) => (
              <TouchableOpacity key={r} className={`px-4 py-2 rounded-full ${i === 0 ? 'bg-primary' : 'bg-white border border-surface-container'}`}>
                <Text className={`text-xs font-semibold ${i === 0 ? 'text-on-primary' : 'text-on-surface-variant'}`}>{r}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Metric tiles */}
        <View className="flex-row flex-wrap px-5 mt-5 gap-3">
          {METRICS.map((m) => (
            <View key={m.label} className="flex-1 min-w-[47%] bg-white rounded-[18px] shadow-sm border border-surface-container-low p-4">
              <Text className="text-on-surface-variant text-xs">{m.label}</Text>
              <View className="flex-row items-center gap-2 mt-2">
                <Text className="text-primary font-bold text-2xl">{m.value}</Text>
                {m.trend && (
                  <Text className={`text-xs font-bold ${m.trend.startsWith('+') ? 'text-primary' : 'text-error'}`}>
                    {m.trend}
                  </Text>
                )}
              </View>
            </View>
          ))}
        </View>

        {/* Views over time chart */}
        <View className="mx-5 mt-5 bg-white rounded-[20px] shadow-sm border border-surface-container-low p-5">
          <Text className="text-[16px] font-bold text-primary">Views Over Time</Text>
          <Text className="text-on-surface-variant text-xs mt-0.5">Daily unique visitors for Skyline Heights</Text>
          <View className="flex-row items-end justify-between h-36 mt-6 px-2">
            {[30, 60, 45, 85, 95, 55, 20, 70, 40, 90, 60, 35].map((h, i) => (
              <View key={i} className={`w-[6%] rounded-t ${i % 2 ? 'bg-secondary-container' : 'bg-primary/70'}`} style={{ height: `${h}%` }} />
            ))}
          </View>
          <View className="flex-row justify-between mt-2 px-2">
            <Text className="text-outline text-[9px]">This Period</Text>
            <Text className="text-outline text-[9px]">Previous Period</Text>
            <Text className="text-outline text-[9px]">Today</Text>
          </View>
        </View>

        {/* Views by day */}
        <View className="mx-5 mt-5 bg-white rounded-[20px] shadow-sm border border-surface-container-low p-5">
          <Text className="text-[16px] font-bold text-primary">Views by Day</Text>
          <Text className="text-on-surface-variant text-xs mt-0.5">Weekly distribution of interest</Text>
          <View className="flex-row items-end justify-between h-28 mt-6 px-2">
            {WEEK.map((d) => (
              <View key={d.day} className="items-center flex-1">
                <View className="w-5 bg-primary/70 rounded-t" style={{ height: `${d.v}%` }} />
                <Text className="text-outline text-[10px] mt-2">{d.day}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Inquiry sources */}
        <View className="mx-5 mt-5 bg-white rounded-[20px] shadow-sm border border-surface-container-low p-5">
          <Text className="text-[16px] font-bold text-primary">Inquiry Sources</Text>
          <Text className="text-on-surface-variant text-xs mt-0.5">Conversion origins by channel</Text>
          <View className="flex-row mt-4 gap-1">
            {SOURCES.map((s) => (
              <View key={s.label} className="h-3 rounded-full flex-1" style={{ backgroundColor: s.color }} />
            ))}
          </View>
          <View className="mt-4 gap-3">
            {SOURCES.map((s) => (
              <View key={s.label} className="flex-row items-center gap-3">
                <View className="w-3 h-3 rounded-full" style={{ backgroundColor: s.color }} />
                <Text className="flex-1 text-on-surface-variant text-sm">{s.label}</Text>
                <Text className="text-primary font-bold text-sm">{s.pct}%</Text>
              </View>
            ))}
          </View>
          <View className="mt-4 pt-4 border-t border-surface-container flex-row justify-between">
            <Text className="text-on-surface-variant text-xs">1.2k Total</Text>
            <Text className="text-secondary text-xs font-semibold">View full report</Text>
          </View>
        </View>
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
          <MaterialIcons name="analytics" size={22} color="#835400" />
          <Text className="text-xs font-bold text-secondary">Analytics</Text>
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
