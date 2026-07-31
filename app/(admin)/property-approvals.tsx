import { View, Text, ScrollView } from 'react-native';

export default function PropertyApprovals() {
  return (
    <ScrollView className="flex-1 bg-dark p-4">
      <Text className="text-gold text-2xl font-bold mb-4">Property Approvals</Text>
      <Text className="text-white text-lg mb-6">
        Review and approve pending property listings
      </Text>

      <View className="bg-card p-4 rounded-lg mb-4">
        <Text className="text-white font-semibold">No pending approvals</Text>
      </View>
    </ScrollView>
  );
}