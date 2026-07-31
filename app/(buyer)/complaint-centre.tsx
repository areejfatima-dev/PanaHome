import { View, Text } from 'react-native';

export default function ComplaintCentre() {
  return (
    <View className="flex-1 bg-dark p-4">
      <Text className="text-gold text-2xl font-bold mb-4">Complaint Centre</Text>
      <Text className="text-white">Submit and track your complaints.</Text>
    </View>
  );
}