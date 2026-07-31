import { View, Text } from 'react-native';

export default function AvailabilitySettings() {
  return (
    <View className="flex-1 bg-dark p-4">
      <Text className="text-gold text-2xl font-bold mb-4">Availability Settings</Text>
      <Text className="text-white">Set your availability for property viewings.</Text>
    </View>
  );
}