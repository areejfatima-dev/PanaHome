import { View, Text, ScrollView } from 'react-native';

export default function ComplaintManagement() {
  return (
    <ScrollView className="flex-1 bg-dark p-4">
      <Text className="text-gold text-2xl font-bold mb-4">Complaint Management</Text>
      <Text className="text-white text-lg mb-6">
        Manage user complaints and reports
      </Text>

      <View className="bg-card p-4 rounded-lg mb-4">
        <Text className="text-white font-semibold">No complaints to display</Text>
      </View>
    </ScrollView>
  );
}