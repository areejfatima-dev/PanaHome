import { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Link } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';

const STEPS = ['Basic', 'Rooms', 'Photos', 'Location', 'Review'];
const STEP = 5;

export default function Step5Review() {
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <View className="flex-1 bg-background items-center justify-center px-8">
        <View className="w-28 h-28 bg-surface-container-lowest rounded-[20px] shadow-xl items-center justify-center mb-8">
          <MaterialIcons name="task-alt" size={64} color="#835400" />
        </View>
        <Text className="text-[26px] font-bold text-primary text-center mb-2">Submitted for Approval!</Text>
        <Text className="text-on-surface-variant text-center text-sm leading-6">
          Our AI verification engine is reviewing your listing. You{`'`}ll be notified within 24 hours.
        </Text>
        <Link href="/(seller)/dashboard" className="w-full max-w-sm mt-8 py-4 bg-primary rounded-full items-center">
          <Text className="text-on-primary font-semibold">Back to Dashboard</Text>
        </Link>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-background">
      <ScrollView className="flex-1" contentContainerStyle={{ paddingBottom: 40 }}>
        <View className="px-5 pt-4 flex-row items-center gap-3">
          <Link href="/(seller)/add-property/step-4-location" className="w-10 h-10 items-center justify-center">
            <MaterialIcons name="arrow-back" size={24} color="#03224d" />
          </Link>
          <Text className="text-[22px] font-bold text-primary">Review Listing</Text>
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

        {/* Listing summary */}
        <View className="mx-5 mt-6 bg-white rounded-[20px] shadow-sm border border-surface-container-low overflow-hidden">
          <View className="h-32 bg-primary items-center justify-center">
            <MaterialIcons name="apartment" size={44} color="#ffffff80" />
          </View>
          <View className="p-5">
            <View className="flex-row justify-between items-start">
              <View className="flex-1">
                <Text className="text-primary font-bold text-lg">Modern Glass Penthouse</Text>
                <Text className="text-on-surface-variant text-xs mt-0.5">3 Beds • 2.5 Baths • 2,400 sq ft</Text>
              </View>
              <Text className="text-secondary font-bold text-lg">$1,250,000</Text>
            </View>
          </View>
        </View>

        {/* Property information */}
        <View className="mx-5 mt-5 bg-white rounded-[20px] shadow-sm border border-surface-container-low p-5">
          <View className="flex-row justify-between items-center mb-2">
            <Text className="text-[16px] font-bold text-primary">Property Information</Text>
            <TouchableOpacity className="flex-row items-center gap-1">
              <MaterialIcons name="edit" size={14} color="#835400" />
              <Text className="text-secondary text-xs font-semibold">Edit</Text>
            </TouchableOpacity>
          </View>
          <Text className="text-on-surface-variant text-sm leading-5">
            A stunning example of contemporary architecture, this penthouse offers panoramic views of the
            skyline with premium finishes throughout. Featuring smart home integration and AR tour
            compatibility...
          </Text>
        </View>

        {/* AI privacy check */}
        <View className="mx-5 mt-5 bg-surface-container-low rounded-[20px] p-5">
          <View className="flex-row items-center gap-2">
            <MaterialIcons name="verified" size={18} color="#835400" />
            <Text className="text-primary font-bold text-sm">AI Privacy Check Passed</Text>
          </View>
          <Text className="text-on-surface-variant text-xs mt-1">6 images processed and cleared for public viewing.</Text>
        </View>

        <Text className="px-5 text-outline text-[11px] text-center mt-6">
          By submitting, you agree to PanaHome{`'`}s Terms of Service and Listing Verification Guidelines.
        </Text>

        <View className="flex-row gap-3 px-5 mt-6">
          <Link href="/(seller)/add-property/step-4-location" className="flex-1 py-4 border-2 border-primary rounded-full items-center">
            <Text className="text-primary font-semibold">Back</Text>
          </Link>
          <TouchableOpacity onPress={() => setSubmitted(true)} className="flex-1 py-4 bg-primary rounded-full items-center flex-row justify-center shadow-lg">
            <MaterialIcons name="send" size={18} color="#fff" style={{ marginRight: 8 }} />
            <Text className="text-on-primary font-semibold">Submit for Approval</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
