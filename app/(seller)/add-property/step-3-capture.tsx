import { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Link } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';

const STEPS = ['Basic', 'Rooms', 'Photos', 'Location', 'Review'];
const STEP = 3;

const SLOTS = ['Front View', 'Back View', 'Left Side', 'Right Side', 'Ceiling', 'Floor'];

export default function Step3Capture() {
  const [uploaded, setUploaded] = useState<string[]>(['Front View']);

  return (
    <View className="flex-1 bg-background">
      <ScrollView className="flex-1" contentContainerStyle={{ paddingBottom: 40 }}>
        <View className="px-5 pt-4 flex-row items-center gap-3">
          <Link href="/(seller)/add-property/step-2-rooms" className="w-10 h-10 items-center justify-center">
            <MaterialIcons name="arrow-back" size={24} color="#03224d" />
          </Link>
          <Text className="text-[22px] font-bold text-primary">Property Media</Text>
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

        <View className="mx-5 mt-6 bg-white rounded-[20px] shadow-sm border border-surface-container-low p-5">
          <View className="flex-row justify-between items-start mb-1">
            <Text className="text-[16px] font-bold text-primary">Property Media</Text>
            <View className="flex-row items-center gap-1 bg-secondary-container px-2 py-1 rounded-full">
              <MaterialIcons name="auto-fix-high" size={12} color="#714800" />
              <Text className="text-[10px] font-extrabold text-on-secondary-container">AI BLURRED</Text>
            </View>
          </View>
          <Text className="text-on-surface-variant text-xs mb-4">
            Upload high-resolution images of the property. AI will automatically blur sensitive elements for privacy.
          </Text>

          <View className="flex-row flex-wrap gap-3">
            {SLOTS.map((slot) => {
              const isUploaded = uploaded.includes(slot);
              return (
                <TouchableOpacity
                  key={slot}
                  onPress={() => setUploaded((u) => (isUploaded ? u.filter((x) => x !== slot) : [...u, slot]))}
                  className={`w-[48%] h-28 rounded-[14px] items-center justify-center ${
                    isUploaded ? 'bg-primary/10 border border-primary/40' : 'border-2 border-dashed border-surface-container-highest'
                  }`}
                >
                  <MaterialIcons name={isUploaded ? 'camera-enhance' : 'add-a-photo'} size={30} color={isUploaded ? '#835400' : '#747780'} />
                  <Text className="text-on-surface-variant text-xs font-semibold mt-2">{slot}</Text>
                </TouchableOpacity>
              );
            })}
          </View>

          <View className="mt-4 flex-row items-center gap-2 bg-surface-container-low rounded-[12px] px-4 py-3">
            <MaterialIcons name="verified" size={16} color="#835400" />
            <Text className="text-on-surface-variant text-xs flex-1">
              {uploaded.length}/6 images uploaded — AR tour requires all 6 angles
            </Text>
          </View>
        </View>

        <View className="flex-row gap-3 px-5 mt-8">
          <Link href="/(seller)/add-property/step-2-rooms" className="flex-1 py-4 border-2 border-primary rounded-full items-center">
            <Text className="text-primary font-semibold">Back</Text>
          </Link>
          <Link href="/(seller)/add-property/step-4-location" className="flex-1 py-4 bg-primary rounded-full items-center flex-row justify-center">
            <Text className="text-on-primary font-semibold mr-2">Next</Text>
            <MaterialIcons name="chevron-right" size={20} color="#fff" />
          </Link>
        </View>
      </ScrollView>
    </View>
  );
}
