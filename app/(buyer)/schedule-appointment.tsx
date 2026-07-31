import { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { Link } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';

const DATES = [
  { day: 'Thu', date: 'Oct 24', active: true },
  { day: 'Fri', date: 'Oct 25', active: false },
  { day: 'Sat', date: 'Oct 26', active: false },
  { day: 'Sun', date: 'Oct 27', active: false },
  { day: 'Mon', date: 'Oct 28', active: false },
];

const SLOTS = ['09:00 AM', '10:30 AM', '12:00 PM', '01:30 PM', '03:00 PM', '04:30 PM'];

export default function ScheduleAppointment() {
  const [note, setNote] = useState('');
  const [confirmed, setConfirmed] = useState(false);

  if (confirmed) {
    return (
      <View className="flex-1 bg-background items-center justify-center px-8">
        <View className="w-28 h-28 bg-surface-container-lowest rounded-[20px] shadow-xl items-center justify-center mb-8">
          <MaterialIcons name="check-circle" size={64} color="#835400" />
        </View>
        <Text className="text-[26px] font-bold text-primary text-center mb-2">Appointment Confirmed!</Text>
        <Text className="text-on-surface-variant text-center text-sm leading-6">
          Your tour for Skyview Horizon Suite is all set. You{`'`}ll receive a confirmation email shortly.
        </Text>
        <TouchableOpacity className="w-full max-w-sm mt-8 py-4 bg-primary rounded-full items-center flex-row justify-center">
          <MaterialIcons name="event" size={18} color="#fff" style={{ marginRight: 8 }} />
          <Text className="text-on-primary font-semibold">Add to Google Calendar</Text>
        </TouchableOpacity>
        <TouchableOpacity className="mt-4 w-full max-w-sm py-4 border-2 border-primary rounded-full items-center">
          <Text className="text-primary font-semibold">View My Appointments</Text>
        </TouchableOpacity>
        <View className="mt-12 flex-row items-center gap-3">
          <View className="w-12 h-12 rounded-full bg-surface-container-high items-center justify-center">
            <MaterialIcons name="support-agent" size={24} color="#03224d" />
          </View>
          <View>
            <Text className="text-on-surface-variant text-xs">Your Agent</Text>
            <Text className="text-primary font-semibold">Sarah Jenkins</Text>
          </View>
          <TouchableOpacity className="ml-3 w-10 h-10 bg-primary rounded-full items-center justify-center">
            <MaterialIcons name="chat" size={20} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-background">
      <ScrollView className="flex-1" contentContainerStyle={{ paddingBottom: 40 }}>
        {/* Header */}
        <View className="px-5 pt-4 flex-row items-center gap-3">
          <Link href="/(buyer)/home" className="w-10 h-10 items-center justify-center">
            <MaterialIcons name="arrow-back" size={24} color="#03224d" />
          </Link>
          <Text className="text-[22px] font-bold text-primary">Schedule Appointment</Text>
        </View>

        {/* Property summary */}
        <View className="mx-5 mt-4 flex-row items-center gap-3 bg-white p-3 rounded-[20px] shadow-sm border border-surface-container-low">
          <View className="w-14 h-14 rounded-[12px] bg-surface-container-high items-center justify-center">
            <MaterialIcons name="apartment" size={28} color="#747780" />
          </View>
          <View className="flex-1">
            <Text className="text-[15px] font-bold text-primary">Skyview Horizon Suite</Text>
            <Text className="flex-row items-center text-on-surface-variant text-xs mt-0.5">
              <MaterialIcons name="location-on" size={14} color="#44474f" /> Manhattan, NY
            </Text>
          </View>
          <View className="bg-secondary px-2 py-1 rounded">
            <Text className="text-white text-[9px] font-bold flex-row items-center gap-1">
              <MaterialIcons name="verified" size={12} color="#fff" /> AI-VERIFIED
            </Text>
          </View>
        </View>

        {/* Select Date */}
        <Text className="px-5 mt-7 text-[18px] font-bold text-primary">Select Date</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="mt-3"
          contentContainerStyle={{ paddingHorizontal: 20, gap: 12 }}
        >
          {DATES.map((d) => (
            <TouchableOpacity
              key={d.date}
              className={`w-20 py-3.5 rounded-[16px] items-center border ${
                d.active ? 'bg-primary border-primary' : 'bg-white border-surface-container'
              }`}
            >
              <Text className={`text-xs ${d.active ? 'text-white/70' : 'text-on-surface-variant'}`}>{d.day}</Text>
              <Text className={`text-sm font-bold mt-1 ${d.active ? 'text-white' : 'text-primary'}`}>{d.date}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Time slots */}
        <Text className="px-5 mt-7 text-[18px] font-bold text-primary">Available Time Slots</Text>
        <View className="flex-row flex-wrap px-5 mt-3 gap-3">
          {SLOTS.map((slot, i) => (
            <TouchableOpacity
              key={slot}
              className={`px-5 py-3 rounded-full border ${
                i === 1 ? 'bg-primary border-primary' : 'bg-white border-surface-container'
              }`}
            >
              <Text className={`text-sm font-semibold ${i === 1 ? 'text-white' : 'text-on-surface-variant'}`}>
                {slot}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Note */}
        <Text className="px-5 mt-7 text-[18px] font-bold text-primary">Add a Note (Optional)</Text>
        <TextInput
          value={note}
          onChangeText={setNote}
          placeholder="Anything we should know?"
          placeholderTextColor="#747780"
          multiline
          className="mx-5 mt-3 min-h-[90px] bg-white rounded-[16px] border border-surface-container p-4 text-on-surface"
        />

        {/* Booking summary */}
        <View className="mx-5 mt-7 bg-white rounded-[20px] shadow-sm border border-surface-container-low p-5">
          <Text className="text-[16px] font-bold text-primary mb-4">Booking Summary</Text>
          <View className="flex-row justify-between mb-3">
            <Text className="flex-row items-center gap-2 text-on-surface-variant">
              <MaterialIcons name="calendar-today" size={18} color="#44474f" /> Thursday, Oct 24, 2024
            </Text>
          </View>
          <View className="flex-row justify-between mb-3">
            <Text className="flex-row items-center gap-2 text-on-surface-variant">
              <MaterialIcons name="schedule" size={18} color="#44474f" /> 10:30 AM - 11:30 AM
            </Text>
          </View>
          <View className="flex-row justify-between">
            <Text className="flex-row items-center gap-2 text-on-surface-variant">
              <MaterialIcons name="person" size={18} color="#44474f" /> Virtual AR Tour with Expert Agent
            </Text>
          </View>
        </View>

        <TouchableOpacity
          onPress={() => setConfirmed(true)}
          className="mx-5 mt-8 py-4 bg-primary rounded-full items-center flex-row justify-center"
        >
          <Text className="text-on-primary font-semibold mr-2">Confirm Appointment</Text>
          <MaterialIcons name="arrow-forward" size={20} color="#fff" />
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
