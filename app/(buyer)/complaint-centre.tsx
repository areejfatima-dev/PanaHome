import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';

const COMPLAINTS = [
  {
    id: '1',
    property: 'Skyline Penthouse • Ref: #CMP-9021',
    desc: 'Leaking AC in Living Room',
    status: 'Pending',
    statusColor: 'bg-secondary-container',
    statusText: 'text-on-secondary-container',
    date: 'Oct 24, 2023',
  },
  {
    id: '2',
    property: 'Azure Villas • Ref: #CMP-8812',
    desc: 'Main Gate Sensor Failure',
    status: 'Resolved',
    statusColor: 'bg-primary/10',
    statusText: 'text-primary',
    date: 'Sep 15, 2023',
  },
  {
    id: '3',
    property: 'The Grand Atrium • Ref: #CMP-7704',
    desc: 'Pool Light flickering',
    status: 'Dismissed',
    statusColor: 'bg-error/10',
    statusText: 'text-error',
    date: 'Aug 02, 2023',
  },
];

export default function ComplaintCentre() {
  return (
    <View className="flex-1 bg-background">
      <ScrollView className="flex-1" contentContainerStyle={{ paddingBottom: 120 }}>
        {/* Header */}
        <View className="px-5 pt-6">
          <View className="flex-row justify-between items-center">
            <View>
              <Text className="text-[26px] font-bold text-primary">Complaint Centre</Text>
              <Text className="text-on-surface-variant text-sm mt-1">Resolution Hub</Text>
            </View>
            <TouchableOpacity className="w-10 h-10 items-center justify-center rounded-full bg-surface-container-lowest shadow-sm">
              <MaterialIcons name="notifications" size={22} color="#03224d" />
            </TouchableOpacity>
          </View>
          <Text className="text-on-surface-variant text-sm mt-4 leading-5">
            Something not right with your property? File a complaint and our AI-powered concierge will
            prioritize your case.
          </Text>
        </View>

        {/* File a new complaint */}
        <TouchableOpacity className="mx-5 mt-5 bg-primary rounded-[20px] p-5 flex-row items-center gap-4 shadow-lg">
          <View className="w-12 h-12 bg-white/20 rounded-full items-center justify-center">
            <MaterialIcons name="edit-note" size={26} color="#fff" />
          </View>
          <View className="flex-1">
            <Text className="text-white font-bold text-base">File a New Complaint</Text>
            <Text className="text-white/70 text-xs mt-0.5">Takes less than 2 minutes</Text>
          </View>
          <MaterialIcons name="chevron-right" size={24} color="#fff" />
        </TouchableOpacity>

        {/* Complaint form */}
        <View className="mx-5 mt-6 bg-white rounded-[20px] shadow-sm border border-surface-container-low p-5">
          <Text className="text-[16px] font-bold text-primary mb-4">Select Property</Text>
          <TouchableOpacity className="flex-row items-center justify-between border border-surface-container rounded-[14px] px-4 py-3.5">
            <View className="flex-row items-center gap-3">
              <MaterialIcons name="apartment" size={22} color="#835400" />
              <Text className="text-on-surface-variant">Skyline Penthouse, Unit 402</Text>
            </View>
            <MaterialIcons name="expand-more" size={20} color="#44474f" />
          </TouchableOpacity>

          <Text className="text-[16px] font-bold text-primary mt-5 mb-4">Reason for Complaint</Text>
          <TouchableOpacity className="flex-row items-center justify-between border border-surface-container rounded-[14px] px-4 py-3.5">
            <View className="flex-row items-center gap-3">
              <MaterialIcons name="report-problem" size={22} color="#835400" />
              <Text className="text-on-surface-variant">Choose a category</Text>
            </View>
            <MaterialIcons name="expand-more" size={20} color="#44474f" />
          </TouchableOpacity>

          <Text className="text-[16px] font-bold text-primary mt-5 mb-4">Description</Text>
          <TouchableOpacity className="flex-row items-center justify-between border border-dashed border-surface-container-highest rounded-[14px] px-4 py-3.5">
            <Text className="text-on-surface-variant text-sm">Describe the issue...</Text>
            <MaterialIcons name="edit" size={20} color="#44474f" />
          </TouchableOpacity>

          <Text className="text-[16px] font-bold text-primary mt-5 mb-4">Supporting Photos</Text>
          <TouchableOpacity className="h-28 rounded-[14px] border-2 border-dashed border-surface-container-highest items-center justify-center">
            <MaterialIcons name="add-a-photo" size={30} color="#835400" />
            <Text className="text-on-surface-variant text-xs mt-2">Tap to upload images</Text>
            <Text className="text-outline text-[10px] mt-0.5">PNG or JPG up to 10MB</Text>
          </TouchableOpacity>

          <TouchableOpacity className="mt-6 py-4 bg-primary rounded-full items-center flex-row justify-center">
            <MaterialIcons name="send" size={18} color="#fff" style={{ marginRight: 8 }} />
            <Text className="text-on-primary font-semibold">Submit Complaint</Text>
          </TouchableOpacity>
        </View>

        {/* Your complaints */}
        <View className="px-5 mt-8">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-[20px] font-bold text-primary">Your Complaints</Text>
            <TouchableOpacity className="flex-row items-center gap-1">
              <MaterialIcons name="filter-list" size={18} color="#835400" />
              <Text className="text-secondary font-semibold text-sm">Filter by Status</Text>
            </TouchableOpacity>
          </View>
          <View className="gap-3">
            {COMPLAINTS.map((c) => (
              <TouchableOpacity
                key={c.id}
                className="bg-white p-4 rounded-[20px] shadow-sm border border-surface-container-low"
              >
                <View className="flex-row justify-between items-start gap-2">
                  <Text className="text-[13px] font-semibold text-primary flex-shrink">{c.property}</Text>
                  <View className={`px-2.5 py-1 rounded-full ${c.statusColor}`}>
                    <Text className={`text-[10px] font-bold ${c.statusText}`}>{c.status}</Text>
                  </View>
                </View>
                <Text className="text-on-surface-variant text-sm mt-2">{c.desc}</Text>
                <View className="flex-row justify-between items-center mt-3 pt-3 border-t border-surface-container">
                  <Text className="flex-row items-center gap-1 text-outline text-xs">
                    <MaterialIcons name="calendar-month" size={14} color="#747780" /> {c.date}
                  </Text>
                  <Text className="text-secondary text-xs font-semibold">
                    {c.status === 'Resolved' ? 'View solution' : 'Update'} <MaterialIcons name="chevron-right" size={14} color="#835400" />
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Support */}
        <View className="mx-5 mt-8 bg-surface-container-low rounded-[20px] p-5 flex-row items-center gap-4">
          <Text className="text-[16px] font-bold text-primary flex-1">Need immediate assistance?</Text>
          <TouchableOpacity className="w-11 h-11 bg-primary rounded-full items-center justify-center">
            <MaterialIcons name="call" size={20} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity className="w-11 h-11 bg-white border border-surface-container rounded-full items-center justify-center">
            <MaterialIcons name="chat-bubble" size={20} color="#03224d" />
          </TouchableOpacity>
        </View>
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
