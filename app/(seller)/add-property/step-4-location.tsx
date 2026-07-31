import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { Link } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';

const STEPS = ['Basic', 'Rooms', 'Photos', 'Location', 'Review'];
const STEP = 4;

export default function Step4Location() {
  const [price, setPrice] = useState('');

  return (
    <View className="flex-1 bg-background">
      <ScrollView className="flex-1" contentContainerStyle={{ paddingBottom: 40 }}>
        <View className="px-5 pt-4 flex-row items-center gap-3">
          <Link href="/(seller)/add-property/step-3-capture" className="w-10 h-10 items-center justify-center">
            <MaterialIcons name="arrow-back" size={24} color="#03224d" />
          </Link>
          <Text className="text-[22px] font-bold text-primary">Location & Pricing</Text>
        </View>

        <View className="flex-row items-center px-5 mt-5">
          {STEPS.map((s, i) => {
            const done = i < STEP - 1;
            const active = i === STEP - 1;
            return (
              <View key={s} className="flex-row items-center flex-1">
                <View className={`w-8 h-8 rounded-full items-center justify-center ${done ? 'bg-primary' : active ? 'bg-secondary' : 'bg-surface-container-high'}`}>
                  <Text className={`text-xs font-bold ${done || active ? 'text-white' : 'text-on-surface-variant'}`}>{i + 1}</Text>
                </View>
                {i < STEPS.length - 1 && <View className={`flex-1 h-0.5 ${i < STEP - 1 ? 'bg-primary' : 'bg-surface-container-high'}`} />}
              </View>
            );
          })}
        </View>

        {/* Financials */}
        <View className="mx-5 mt-6 bg-white rounded-[20px] shadow-sm border border-surface-container-low p-5">
          <Text className="text-[16px] font-bold text-primary">Financials</Text>
          <Text className="text-on-surface-variant text-xs mt-1 mb-4">Set your listing price and view AI market analysis.</Text>

          <Text className="text-on-surface-variant text-sm font-semibold mb-2">Listing Price ($)</Text>
          <View className="flex-row items-center bg-surface-container-low rounded-[14px] px-4 py-3.5 mb-4">
            <Text className="text-on-surface-variant font-semibold mr-2">$</Text>
            <TextInput
              value={price}
              onChangeText={setPrice}
              placeholder="1,250,000"
              placeholderTextColor="#747780"
              keyboardType="numeric"
              className="flex-1 text-on-surface"
            />
            <MaterialIcons name="bolt" size={20} color="#835400" />
          </View>

          <View className="bg-secondary-container/40 rounded-[16px] p-4">
            <View className="flex-row items-center gap-2 mb-2">
              <MaterialIcons name="auto-awesome" size={16} color="#714800" />
              <Text className="text-on-secondary-container font-bold text-sm">AI Suggested Price Range</Text>
            </View>
            <Text className="text-primary font-extrabold text-xl">$1.18M - $1.32M</Text>
            <View className="flex-row items-center gap-1 mt-1">
              <Text className="text-on-secondary-container text-xs font-bold">CONVINCING</Text>
            </View>
            <Text className="text-on-surface-variant text-[11px] mt-2 leading-4">
              Based on current market trends and similar listings within 2 miles of your location.
            </Text>
          </View>
        </View>

        {/* Location */}
        <View className="mx-5 mt-6 bg-white rounded-[20px] shadow-sm border border-surface-container-low p-5">
          <Text className="text-[16px] font-bold text-primary">Location</Text>
          <Text className="text-on-surface-variant text-xs mt-1 mb-4">Where is this property located?</Text>

          <Text className="text-on-surface-variant text-sm font-semibold mb-2">Address</Text>
          <TextInput
            placeholder="123 Skyline Avenue"
            placeholderTextColor="#747780"
            className="bg-surface-container-low rounded-[14px] px-4 py-3.5 text-on-surface mb-4"
          />
          <View className="flex-row gap-3 mb-4">
            <View className="flex-1">
              <Text className="text-on-surface-variant text-sm font-semibold mb-2">City</Text>
              <TextInput placeholder="New York" placeholderTextColor="#747780" className="bg-surface-container-low rounded-[14px] px-4 py-3.5 text-on-surface" />
            </View>
            <View className="flex-1">
              <Text className="text-on-surface-variant text-sm font-semibold mb-2">State</Text>
              <TextInput placeholder="NY" placeholderTextColor="#747780" className="bg-surface-container-low rounded-[14px] px-4 py-3.5 text-on-surface" />
            </View>
          </View>

          <TouchableOpacity className="flex-row items-center justify-center gap-2 py-3.5 bg-surface-container-low rounded-[14px]">
            <MaterialIcons name="my-location" size={18} color="#835400" />
            <Text className="text-secondary font-semibold text-sm">Use my current location</Text>
          </TouchableOpacity>
        </View>

        <View className="flex-row gap-3 px-5 mt-8">
          <Link href="/(seller)/add-property/step-3-capture" className="flex-1 py-4 border-2 border-primary rounded-full items-center">
            <Text className="text-primary font-semibold">Back</Text>
          </Link>
          <Link href="/(seller)/add-property/step-5-review" className="flex-1 py-4 bg-primary rounded-full items-center flex-row justify-center">
            <Text className="text-on-primary font-semibold mr-2">Next</Text>
            <MaterialIcons name="chevron-right" size={20} color="#fff" />
          </Link>
        </View>
      </ScrollView>
    </View>
  );
}
