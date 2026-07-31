import { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Link } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';

const STEPS = ['Basic', 'Rooms', 'Photos', 'Location', 'Review'];
const STEP = 2;

function Counter({ label, value, onChange }: { label: string; value: number; onChange: (v: number) => void }) {
  return (
    <View className="bg-white rounded-[20px] shadow-sm border border-surface-container-low p-5 mb-4">
      <View className="flex-row items-center justify-between">
        <View>
          <Text className="text-primary font-bold text-lg">{label}</Text>
          <Text className="text-on-surface-variant text-xs mt-0.5">{value} total</Text>
        </View>
        <View className="flex-row items-center gap-4">
          <TouchableOpacity
            onPress={() => onChange(Math.max(0, value - 1))}
            className="w-9 h-9 bg-surface-container-low rounded-full items-center justify-center"
          >
            <MaterialIcons name="remove" size={20} color="#03224d" />
          </TouchableOpacity>
          <Text className="text-primary font-bold text-2xl w-8 text-center">{value}</Text>
          <TouchableOpacity
            onPress={() => onChange(value + 1)}
            className="w-9 h-9 bg-secondary rounded-full items-center justify-center"
          >
            <MaterialIcons name="add" size={20} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

export default function Step2Rooms() {
  const [beds, setBeds] = useState(3);
  const [baths, setBaths] = useState(2.5);
  const [parking, setParking] = useState(1);

  return (
    <View className="flex-1 bg-background">
      <ScrollView className="flex-1" contentContainerStyle={{ paddingBottom: 40 }}>
        <View className="px-5 pt-4 flex-row items-center gap-3">
          <Link href="/(seller)/add-property/step-1-basic" className="w-10 h-10 items-center justify-center">
            <MaterialIcons name="arrow-back" size={24} color="#03224d" />
          </Link>
          <Text className="text-[22px] font-bold text-primary">Rooms & Layout</Text>
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

        <View className="mx-5 mt-6">
          <Text className="text-[16px] font-bold text-primary mb-4">Define your space</Text>
          <Counter label="Bedrooms" value={beds} onChange={setBeds} />
          <Counter label="Bathrooms" value={baths} onChange={(v) => setBaths(Math.min(10, v))} />
          <Counter label="Parking Spaces" value={parking} onChange={setParking} />

          <Text className="text-on-surface-variant text-sm font-semibold mb-2 mt-2">Key Amenities</Text>
          <View className="flex-row flex-wrap gap-2 mb-4">
            {['Pool', 'Gym', 'Smart Home', 'Balcony', 'Security', 'Parking'].map((a, i) => (
              <TouchableOpacity key={a} className={`flex-row items-center gap-1 px-4 py-2.5 rounded-full ${i < 3 ? 'bg-primary' : 'bg-surface-container-low'}`}>
                <Text className={`text-sm font-semibold ${i < 3 ? 'text-on-primary' : 'text-on-surface-variant'}`}>{a}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View className="flex-row gap-3 px-5 mt-6">
          <Link href="/(seller)/add-property/step-1-basic" className="flex-1 py-4 border-2 border-primary rounded-full items-center">
            <Text className="text-primary font-semibold">Back</Text>
          </Link>
          <Link href="/(seller)/add-property/step-3-capture" className="flex-1 py-4 bg-primary rounded-full items-center flex-row justify-center">
            <Text className="text-on-primary font-semibold mr-2">Next</Text>
            <MaterialIcons name="chevron-right" size={20} color="#fff" />
          </Link>
        </View>
      </ScrollView>
    </View>
  );
}
