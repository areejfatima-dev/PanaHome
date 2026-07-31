import { View, Text } from 'react-native';

export default function History() {
  return (
    <View className="flex-1 bg-dark p-4">
      <Text className="text-gold text-2xl font-bold mb-4">Viewing History</Text>
      <Text className="text-white">Your recently viewed properties will appear here.</Text>
    </View>
  );
}