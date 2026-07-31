import { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const TABS = ['Pending', 'Approved', 'Rejected'];

const LISTINGS = [
  {
    id: '#LX-9901',
    title: 'Skyline Penthouse',
    seller: 'Marcus Aurelius',
    submitted: 'Oct 24, 2023',
    status: 'Pending',
    flagged: true,
    price: '$4,250,000',
    size: '3,200',
  },
  {
    id: '#LX-9900',
    title: 'Nordic Loft A3',
    seller: 'Elena Petrov',
    submitted: 'Oct 23, 2023',
    status: 'Pending',
    flagged: false,
  },
  {
    id: '#LX-9899',
    title: 'Cedar Ridge Estate',
    seller: 'Julian Thorne',
    submitted: 'Oct 22, 2023',
    status: 'Pending',
    flagged: false,
  },
  {
    id: '#LX-9898',
    title: 'Emerald Bay Suite',
    seller: 'Sarah Jenkins',
    submitted: 'Oct 21, 2023',
    status: 'Pending',
    flagged: false,
  },
];

export default function PropertyApprovals() {
  const [tab, setTab] = useState('Pending');
  const [selected, setSelected] = useState<string | null>('Skyline Penthouse');

  return (
    <View className="flex-1 bg-background">
      <ScrollView className="flex-1" contentContainerStyle={{ paddingBottom: 40 }}>
        {/* Header */}
        <View className="px-5 pt-6">
          <View className="flex-row justify-between items-center">
            <View>
              <Text className="text-[26px] font-bold text-primary">Property Approvals</Text>
              <Text className="text-on-surface-variant text-sm mt-1">Manage and review new real estate listings.</Text>
            </View>
            <TouchableOpacity className="w-10 h-10 items-center justify-center rounded-full bg-surface-container-lowest shadow-sm">
              <MaterialIcons name="notifications" size={22} color="#03224d" />
            </TouchableOpacity>
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

        {/* Listings list */}
        <View className="px-5 mt-5 gap-3">
          {LISTINGS.filter((l) => l.status === tab || (tab === 'Pending' && l.status === 'Pending')).map((l) => (
            <TouchableOpacity
              key={l.id}
              onPress={() => setSelected(l.title)}
              className={`bg-white p-4 rounded-[20px] shadow-sm border ${
                selected === l.title ? 'border-primary' : 'border-surface-container-low'
              }`}
            >
              <View className="flex-row items-center gap-3">
                <View className="w-14 h-14 rounded-[12px] bg-surface-container-high items-center justify-center">
                  <MaterialIcons name="apartment" size={26} color="#747780" />
                </View>
                <View className="flex-1">
                  <Text className="text-[14px] font-bold text-primary">{l.title}</Text>
                  <Text className="text-on-surface-variant text-xs mt-0.5">Seller: {l.seller}</Text>
                  <Text className="text-on-surface-variant text-xs">Submitted: {l.submitted}</Text>
                </View>
                {l.flagged && (
                  <View className="bg-error/10 px-2 py-1 rounded-full">
                    <Text className="text-error text-[9px] font-bold flex-row items-center">
                      <MaterialIcons name="warning" size={10} color="#ba1a1a" /> FLAGGED
                    </Text>
                  </View>
                )}
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Selected property detail */}
        <View className="mx-5 mt-6 bg-white rounded-[20px] shadow-sm border border-surface-container-low overflow-hidden">
          <View className="h-40 bg-primary items-center justify-center relative">
            <MaterialIcons name="apartment" size={44} color="#ffffff80" />
            <View className="absolute top-3 right-3 bg-white/90 rounded-full px-3 py-1.5 flex-row items-center gap-1">
              <MaterialIcons name="open-in-full" size={14} color="#03224d" />
              <Text className="text-primary text-[10px] font-bold">View Main Photo +12 Photos</Text>
            </View>
          </View>
          <View className="p-5">
            <View className="flex-row justify-between items-start">
              <View>
                <Text className="text-primary font-bold text-lg">Skyline Penthouse - Unit 402</Text>
                <Text className="text-outline text-xs mt-0.5">Property ID: #LX-9902</Text>
              </View>
              {true && (
                <View className="bg-error/10 px-2.5 py-1 rounded-full flex-row items-center gap-1">
                  <MaterialIcons name="report-problem" size={12} color="#ba1a1a" />
                  <Text className="text-error text-[10px] font-bold">Flagged by AI Detector</Text>
                </View>
              )}
            </View>
            <Text className="text-[16px] font-bold text-primary mt-4 mb-3">Property Specifications</Text>
            <View className="flex-row gap-8">
              <View>
                <Text className="text-on-surface-variant text-xs">Price</Text>
                <Text className="text-primary font-bold text-base">$4,250,000</Text>
              </View>
              <View>
                <Text className="text-on-surface-variant text-xs">Size</Text>
                <Text className="text-primary font-bold text-base">3,200 sqft</Text>
              </View>
              <View>
                <Text className="text-on-surface-variant text-xs">Beds</Text>
                <Text className="text-primary font-bold text-base">5</Text>
              </View>
              <View>
                <Text className="text-on-surface-variant text-xs">Baths</Text>
                <Text className="text-primary font-bold text-base">4</Text>
              </View>
            </View>
            <View className="flex-row gap-3 mt-6">
              <TouchableOpacity className="flex-1 py-3.5 border-2 border-error/40 rounded-full items-center">
                <Text className="text-error font-semibold">Reject</Text>
              </TouchableOpacity>
              <TouchableOpacity className="flex-1 py-3.5 bg-primary rounded-full items-center">
                <Text className="text-on-primary font-semibold">Approve</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
