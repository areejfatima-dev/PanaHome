import { Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';

export default function Step1Basic() {
  return (
    <ScrollView className="flex-1 bg-dark p-6">
      <Text className="text-gold text-2xl font-bold mb-4">Step 1: Basic Info</Text>
      <Text className="text-white text-lg mb-6">Enter property basics</Text>

      <TextInput
        placeholder="Property Title"
        placeholderTextColor="#888"
        className="bg-card text-white p-4 rounded-lg mb-4"
      />
      <TextInput
        placeholder="Description"
        placeholderTextColor="#888"
        multiline
        numberOfLines={4}
        className="bg-card text-white p-4 rounded-lg mb-4"
      />
      <TextInput
        placeholder="Price"
        placeholderTextColor="#888"
        keyboardType="numeric"
        className="bg-card text-white p-4 rounded-lg mb-4"
      />
      <TextInput
        placeholder="Property Type"
        placeholderTextColor="#888"
        className="bg-card text-white p-4 rounded-lg mb-6"
      />

      <TouchableOpacity className="bg-gold py-3 rounded-lg items-center">
        <Text className="text-dark font-semibold text-lg">Continue</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}