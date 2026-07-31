import { View, Text, ScrollView } from 'react-native';

export default function AdminDashboard() {
  return (
    <ScrollView className="flex-1 bg-dark p-4">
      <Text className="text-gold text-2xl font-bold mb-4">Admin Dashboard</Text>
      <Text className="text-white text-lg mb-6">Admin panel for PanaHome</Text>

      <View className="bg-card p-4 rounded-lg mb-4">
        <Text className="text-white font-semibold">Total Users</Text>
        <Text className="text-gold text-2xl">0</Text>
      </View>

      <View className="bg-card p-4 rounded-lg mb-4">
        <Text className="text-white font-semibold">Total Properties</Text>
        <Text className="text-gold text-2xl">0</Text>
      </View>

      <View className="bg-card p-4 rounded-lg mb-4">
        <Text className="text-white font-semibold">Pending Approvals</Text>
        <Text className="text-gold text-2xl">0</Text>
      </View>

      <View className="bg-card p-4 rounded-lg mb-4">
        <Text className="text-white font-semibold">Open Complaints</Text>
        <Text className="text-gold text-2xl">0</Text>
      </View>
    </ScrollView>
  );
}