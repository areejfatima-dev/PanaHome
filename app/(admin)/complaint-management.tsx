import { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const TABS = ['Open', 'Resolved', 'Dismissed'];

const SUMMARY = [
  { icon: 'report-problem', label: 'Open', value: '12', color: '#ba1a1a' },
  { icon: 'check-circle', label: 'Resolved', value: '45', color: '#835400' },
  { icon: 'block', label: 'Dismissed', value: '8', color: '#44474f' },
];

export default function ComplaintManagement() {
  const [tab, setTab] = useState('Open');
  const [selected, setSelected] = useState(true);

  return (
    <View className="flex-1 bg-background">
      <ScrollView className="flex-1" contentContainerStyle={{ paddingBottom: 40 }}>
        {/* Header */}
        <View className="px-5 pt-6">
          <View className="flex-row justify-between items-center">
            <View>
              <Text className="text-[26px] font-bold text-primary">Complaint Management</Text>
              <Text className="text-on-surface-variant text-sm mt-1">Resolving tenant and buyer concerns with AI priority.</Text>
            </View>
            <TouchableOpacity className="w-10 h-10 items-center justify-center rounded-full bg-surface-container-lowest shadow-sm">
              <MaterialIcons name="notifications" size={22} color="#03224d" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Summary stats */}
        <View className="flex-row gap-3 px-5 mt-5">
          {SUMMARY.map((s) => (
            <View key={s.label} className="flex-1 bg-white rounded-[18px] shadow-sm border border-surface-container-low p-4 items-center">
              <MaterialIcons name={s.icon as any} size={20} color={s.color} />
              <Text className="text-primary font-bold text-xl mt-1">{s.value}</Text>
              <Text className="text-on-surface-variant text-xs">{s.label}</Text>
            </View>
          ))}
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

        {/* Complaint card */}
        <View className="mx-5 mt-5 bg-white rounded-[20px] shadow-sm border border-surface-container-low p-5">
          <View className="flex-row items-start justify-between">
            <View className="flex-row items-center gap-3 flex-1">
              <View className="w-11 h-11 rounded-full bg-surface-container-high items-center justify-center">
                <MaterialIcons name="person" size={22} color="#03224d" />
              </View>
              <View className="flex-1">
                <Text className="text-primary font-bold text-[15px]">Sarah Jenkins</Text>
                <Text className="text-on-surface-variant text-xs">Penthouse B, Skyline Heights</Text>
              </View>
            </View>
            <View className="items-end gap-1">
              <View className="bg-error/10 px-2.5 py-1 rounded-full">
                <Text className="text-error text-[10px] font-bold">Critical</Text>
              </View>
              <Text className="text-outline text-[10px]">Aging 4d</Text>
            </View>
          </View>

          <View className="mt-4 bg-surface-container-low rounded-[14px] p-4">
            <Text className="text-on-surface-variant text-sm font-semibold flex-row items-center gap-1">
              <MaterialIcons name="construction" size={16} color="#835400" /> Structural Leak • Ticket #8842
            </Text>
            <Text className="text-on-surface-variant text-sm mt-2 leading-5">
              Water damage appearing on living room ceiling...
            </Text>
          </View>

          <TouchableOpacity onPress={() => setSelected(!selected)} className="flex-row items-center gap-1 mt-4">
            <Text className="text-secondary font-semibold text-sm">Details</Text>
            <MaterialIcons name={selected ? 'expand-less' : 'expand-more'} size={20} color="#835400" />
          </TouchableOpacity>

          {selected && (
            <View className="mt-3 border-t border-surface-container pt-4">
              <Text className="text-on-surface-variant text-sm leading-5">
                Noticed a spreading damp patch on the ceiling directly under the balcony drainage pipe.
                This occurred after the heavy storm on Tuesday. Possible blockage or seal failure.
              </Text>
              <View className="flex-row gap-3 mt-5">
                <TouchableOpacity className="flex-1 py-3 bg-primary rounded-full items-center">
                  <Text className="text-on-primary font-semibold text-sm">Resolve</Text>
                </TouchableOpacity>
                <TouchableOpacity className="flex-1 py-3 border border-surface-container-highest rounded-full items-center">
                  <Text className="text-on-surface-variant font-semibold text-sm">Dismiss</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
}
