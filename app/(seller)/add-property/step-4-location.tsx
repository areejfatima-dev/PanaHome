import { Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';

export default function Step4Location() {
  return (
    <ScrollView className="flex-1 bg-dark p-6">
      <Text className="text-gold text-2xl font-bold mb-4">Step 4: Location</Text>
      <Text className="text-white text-lg mb-6">Set property location</Text>

      <TextInput
        placeholder="Address"
        placeholderTextColor="#888"
        className="bg-card text-white p-4 rounded-lg mb-4"
      />
      <TextInput
        placeholder="City"
        placeholderTextColor="#888"
        className="bg-card text-white p-4 rounded-lg mb-4"
      />
      <TextInput
        placeholder="State"
        placeholderTextColor="#888"
        className="bg-card text-white p-4 rounded-lg mb-4"
      />
      <TextInput
        placeholder="ZIP Code"
        placeholderTextColor="#888"
        className="bg-card text-white p-4 rounded-lg mb-6"
      />

      <TouchableOpacity className="bg-gold py-3 rounded-lg items-center">
        <Text className="text-dark font-semibold text-lg">Continue</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}