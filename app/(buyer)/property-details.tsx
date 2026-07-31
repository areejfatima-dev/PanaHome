import { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';

const WEEK = [
  { day: 'MON', date: '12' },
  { day: 'TUE', date: '13', active: true },
  { day: 'WED', date: '14' },
  { day: 'THU', date: '15' },
  { day: 'FRI', date: '16' },
];

export default function PropertyDetails() {
  const [fav, setFav] = useState(false);

  return (
    <View className="flex-1 bg-background">
      <ScrollView className="flex-1" contentContainerStyle={{ paddingBottom: 40 }}>
        {/* Hero image */}
        <View className="h-72 bg-primary relative">
          <View className="absolute top-12 left-5 right-5 flex-row justify-between items-center">
            <TouchableOpacity className="w-10 h-10 bg-white/90 rounded-full items-center justify-center shadow-sm">
              <MaterialIcons name="arrow-back" size={22} color="#03224d" />
            </TouchableOpacity>
            <View className="flex-row gap-2">
              <TouchableOpacity className="w-10 h-10 bg-white/90 rounded-full items-center justify-center shadow-sm">
                <MaterialIcons name="share" size={20} color="#03224d" />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setFav(!fav)}
                className={`w-10 h-10 bg-white/90 rounded-full items-center justify-center shadow-sm ${fav ? 'bg-secondary' : ''}`}
              >
                <MaterialIcons name="favorite" size={20} color={fav ? '#fff' : '#03224d'} />
              </TouchableOpacity>
            </View>
          </View>
          <View className="absolute bottom-5 right-5">
            <Link href="/(buyer)/ar-walkthrough" className="flex-row items-center gap-2 bg-secondary px-4 py-2.5 rounded-full shadow-lg">
              <MaterialIcons name="view-in-ar" size={18} color="#fff" />
              <Text className="text-white font-semibold text-sm">View in AR</Text>
            </Link>
          </View>
        </View>

        {/* Price + title */}
        <View className="px-5 mt-5">
          <View className="flex-row justify-between items-start">
            <View className="flex-1">
              <Text className="text-[28px] font-bold text-primary">$4,850,000</Text>
              <View className="flex-row items-center gap-2 mt-1">
                <View className="bg-secondary px-2 py-0.5 rounded-full flex-row items-center gap-1">
                  <MaterialIcons name="verified" size={12} color="#fff" />
                  <Text className="text-white text-[10px] font-bold">AI PRICE MATCH</Text>
                </View>
                <Text className="text-secondary text-xs font-semibold">Fair Price</Text>
              </View>
            </View>
          </View>
          <Text className="text-[22px] font-bold text-primary mt-3">Skyline Horizon Villa</Text>
          <Text className="flex-row items-center text-on-surface-variant mt-1">
            <MaterialIcons name="location-on" size={16} color="#44474f" /> Bel Air, Los Angeles, CA
          </Text>
          <View className="flex-row gap-5 mt-4">
            <Text className="flex-row items-center gap-2 text-on-surface-variant">
              <MaterialIcons name="bed" size={20} color="#44474f" /> <Text className="font-bold text-primary text-lg">5</Text> Beds
            </Text>
            <Text className="flex-row items-center gap-2 text-on-surface-variant">
              <MaterialIcons name="bathtub" size={20} color="#44474f" /> <Text className="font-bold text-primary text-lg">6</Text> Baths
            </Text>
            <Text className="flex-row items-center gap-2 text-on-surface-variant">
              <MaterialIcons name="square-foot" size={20} color="#44474f" /> <Text className="font-bold text-primary text-lg">6,200</Text> sqft
            </Text>
          </View>
        </View>

        {/* AI interactive */}
        <View className="mx-5 mt-6 bg-surface-container-low rounded-[20px] p-5">
          <Text className="flex-row items-center gap-2 text-[16px] font-bold text-primary">
            <MaterialIcons name="auto-awesome" size={20} color="#835400" /> AI Interactive
          </Text>
          <Text className="text-on-surface-variant text-sm mt-2 leading-5">
            Furnish this space. Visualize premium furniture layouts in real-time using AR.
          </Text>
          <Link href="/(buyer)/ar-furniture-placement" className="mt-4 self-start py-3 px-6 bg-primary rounded-full">
            <Text className="text-on-primary font-semibold text-sm">Try AR Furniture Placement</Text>
          </Link>
        </View>

        {/* Agent */}
        <View className="mx-5 mt-6 bg-white rounded-[20px] shadow-sm border border-surface-container-low p-5">
          <View className="flex-row items-center gap-4">
            <View className="w-14 h-14 rounded-full bg-surface-container-high items-center justify-center">
              <MaterialIcons name="person" size={28} color="#03224d" />
            </View>
            <View className="flex-1">
              <View className="flex-row items-center gap-1.5">
                <Text className="text-primary font-bold text-base">Elena Richards</Text>
                <MaterialIcons name="star" size={14} color="#835400" />
              </View>
              <Text className="text-xs font-bold text-secondary">Verified Luxury Seller</Text>
              <Text className="text-on-surface-variant text-xs mt-0.5">
                Specializing in coastal luxury estates for over 12 years.
              </Text>
            </View>
            <TouchableOpacity className="w-10 h-10 bg-primary rounded-full items-center justify-center">
              <MaterialIcons name="chat" size={20} color="#fff" />
            </TouchableOpacity>
          </View>
          <View className="flex-row items-center justify-between mt-4 pt-4 border-t border-surface-container">
            <View className="flex-row items-center gap-1">
              <MaterialIcons name="verified" size={14} color="#835400" />
              <Text className="text-on-surface-variant text-xs">AI-Verified transaction history</Text>
            </View>
            <View className="bg-secondary-container px-2 py-0.5 rounded">
              <Text className="text-[10px] font-extrabold text-on-secondary-container">TOP 1% AGENT</Text>
            </View>
          </View>
          <View className="flex-row items-center justify-between mt-3">
            <Text className="text-on-surface-variant text-xs">
              <Text className="font-bold text-primary">5.0</Text> ★ (120+)
            </Text>
            <TouchableOpacity>
              <Text className="text-secondary text-xs font-semibold">Available for Viewings</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Availability */}
        <View className="mx-5 mt-6">
          <View className="flex-row justify-between items-center mb-3">
            <Text className="text-[18px] font-bold text-primary">Availability</Text>
            <TouchableOpacity className="flex-row items-center gap-1">
              <Text className="text-secondary text-sm font-semibold">View all</Text>
              <MaterialIcons name="chevron-right" size={18} color="#835400" />
            </TouchableOpacity>
          </View>
          <View className="flex-row gap-3">
            {WEEK.map((d) => (
              <View
                key={d.date}
                className={`flex-1 py-3 rounded-[14px] items-center border ${
                  d.active ? 'bg-primary border-primary' : 'bg-white border-surface-container'
                }`}
              >
                <Text className={`text-[10px] font-semibold ${d.active ? 'text-white/70' : 'text-on-surface-variant'}`}>{d.day}</Text>
                <Text className={`text-base font-bold mt-1 ${d.active ? 'text-white' : 'text-primary'}`}>{d.date}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Description */}
        <View className="px-5 mt-7">
          <Text className="text-[18px] font-bold text-primary mb-2">Description</Text>
          <Text className="text-on-surface-variant text-sm leading-6">
            This architectural masterpiece redefined modern coastal living. Nestled in the heart of Bel
            Air, the Skyline Horizon Villa features an open-concept design that seamlessly blends indoor
            and outdoor spaces. The property includes a private infinity pool, a state-of-the-art home
            theater, and an AI-managed climate system for optimal sustainability.
            <Text className="text-secondary font-semibold"> Read more</Text>
          </Text>
        </View>

        {/* Mortgage */}
        <View className="mx-5 mt-7 bg-surface-container-low rounded-[20px] p-5 flex-row items-center gap-3">
          <MaterialIcons name="currency-exchange" size={28} color="#835400" />
          <Text className="flex-1 text-on-surface-variant text-sm">
            Mortgage from <Text className="font-bold text-primary">$18,240/mo</Text>
          </Text>
          <MaterialIcons name="chevron-right" size={20} color="#44474f" />
        </View>
      </ScrollView>

      {/* Bottom CTA */}
      <View className="px-5 py-4 bg-white border-t border-surface-container">
        <Link href="/(buyer)/schedule-appointment" className="w-full py-4 bg-primary rounded-full items-center flex-row justify-center shadow-lg">
          <MaterialIcons name="calendar-month" size={18} color="#fff" style={{ marginRight: 8 }} />
          <Text className="text-on-primary font-semibold">Schedule Appointment</Text>
        </Link>
      </View>
    </View>
  );
}
