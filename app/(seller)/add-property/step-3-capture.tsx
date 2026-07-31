import { Text, TouchableOpacity, ScrollView } from 'react-native';

export default function Step3Capture() {
  return (
    <ScrollView className="flex-1 bg-dark p-6">
      <Text className="text-gold text-2xl font-bold mb-4">Step 3: Capture</Text>
      <Text className="text-white text-lg mb-6">
        Capture 6 photos for the virtual walkthrough
      </Text>

      <TouchableOpacity className="bg-card p-4 rounded-lg items-center mb-4">
        <Text className="text-white">Select Photos</Text>
      </TouchableOpacity>

      <Text className="text-white mb-4">
        You need to capture or select 6 photos for the walkthrough.
      </Text>

      <TouchableOpacity className="bg-gold py-3 rounded-lg items-center">
        <Text className="text-dark font-semibold text-lg">Continue</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}