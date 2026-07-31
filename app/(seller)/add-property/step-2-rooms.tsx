import { Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';

export default function Step2Rooms() {
  return (
    <ScrollView className="flex-1 bg-dark p-6">
      <Text className="text-gold text-2xl font-bold mb-4">Step 2: Rooms</Text>
      <Text className="text-white text-lg mb-6">Specify room details</Text>

      <TextInput
        placeholder="Bedrooms"
        placeholderTextColor="#888"
        keyboardType="numeric"
        className="bg-card text-white p-4 rounded-lg mb-4"
      />
      <TextInput
        placeholder="Bathrooms"
        placeholderTextColor="#888"
        keyboardType="numeric"
        className="bg-card text-white p-4 rounded-lg mb-4"
      />
      <TextInput
        placeholder="Area (sq ft)"
        placeholderTextColor="#888"
        keyboardType="numeric"
        className="bg-card text-white p-4 rounded-lg mb-6"
      />

      <TouchableOpacity className="bg-gold py-3 rounded-lg items-center">
        <Text className="text-dark font-semibold text-lg">Continue</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}