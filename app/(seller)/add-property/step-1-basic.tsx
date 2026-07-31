import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { Link } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';

const STEPS = ['Basic', 'Rooms', 'Photos', 'Location', 'Review'];
const STEP = 1;

export default function Step1Basic() {
  return (
    <View className="flex-1 bg-background">
      <ScrollView className="flex-1" contentContainerStyle={{ paddingBottom: 40 }}>
        {/* Header */}
        <View className="px-5 pt-4 flex-row items-center gap-3">
          <Link href="/(seller)/dashboard" className="w-10 h-10 items-center justify-center">
            <MaterialIcons name="arrow-back" size={24} color="#03224d" />
          </Link>
          <Text className="text-[22px] font-bold text-primary">Add Property</Text>
        </View>

        {/* Stepper */}
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
        <View className="flex-row px-3 mt-2">
          {STEPS.map((l) => (
            <Text key={l} className="text-[10px] text-center text-on-surface-variant" style={{ width: '20%' }}>{l}</Text>
          ))}
        </View>

        {/* Property Details section */}
        <View className="mx-5 mt-6 bg-white rounded-[20px] shadow-sm border border-surface-container-low p-5">
          <Text className="text-[16px] font-bold text-primary">Property Details</Text>
          <Text className="text-on-surface-variant text-xs mt-1 mb-4">Define the core characteristics of the listing.</Text>

          <Text className="text-on-surface-variant text-sm font-semibold mb-2">Property Title</Text>
          <TextInput
            placeholder="e.g. Modern Glass Penthouse"
            placeholderTextColor="#747780"
            className="bg-surface-container-low rounded-[14px] px-4 py-3.5 text-on-surface mb-4"
          />

          <Text className="text-on-surface-variant text-sm font-semibold mb-2">Description</Text>
          <TextInput
            placeholder="Describe the property..."
            placeholderTextColor="#747780"
            multiline
            numberOfLines={4}
            className="bg-surface-container-low rounded-[14px] px-4 py-3.5 text-on-surface min-h-[100px] mb-4"
          />

          <Text className="text-on-surface-variant text-sm font-semibold mb-2">Type</Text>
          <View className="flex-row flex-wrap gap-2 mb-4">
            {['Apartment', 'Villa', 'Commercial'].map((t, i) => (
              <TouchableOpacity key={t} className={`px-5 py-2.5 rounded-full ${i === 0 ? 'bg-primary' : 'bg-surface-container-low'}`}>
                <Text className={`text-sm font-semibold ${i === 0 ? 'text-on-primary' : 'text-on-surface-variant'}`}>{t}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text className="text-on-surface-variant text-sm font-semibold mb-2">Area (sq ft)</Text>
          <TextInput
            placeholder="2,400"
            placeholderTextColor="#747780"
            keyboardType="numeric"
            className="bg-surface-container-low rounded-[14px] px-4 py-3.5 text-on-surface mb-2"
          />
        </View>

        <View className="flex-row gap-3 px-5 mt-8">
          <TouchableOpacity className="flex-1 py-4 border-2 border-primary rounded-full items-center">
            <Text className="text-primary font-semibold">Back</Text>
          </TouchableOpacity>
          <Link href="/(seller)/add-property/step-2-rooms" className="flex-1 py-4 bg-primary rounded-full items-center flex-row justify-center">
            <Text className="text-on-primary font-semibold mr-2">Next</Text>
            <MaterialIcons name="chevron-right" size={20} color="#fff" />
          </Link>
        </View>
      </ScrollView>
    </View>
  );
}
