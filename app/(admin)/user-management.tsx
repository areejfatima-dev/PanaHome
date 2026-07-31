import { View, Text, ScrollView } from 'react-native';

export default function UserManagement() {
  return (
    <ScrollView className="flex-1 bg-dark p-4">
      <Text className="text-gold text-2xl font-bold mb-4">User Management</Text>
      <Text className="text-white text-lg mb-6">Manage platform users</Text>

      <View className="bg-card p-4 rounded-lg mb-4">
        <Text className="text-white font-semibold">No users to display</Text>
      </View>
    </ScrollView>
  );
}