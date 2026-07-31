import { View, Text } from 'react-native';
import { Link } from 'expo-router';

export default function Index() {
  return (
    <View className="flex-1 bg-dark items-center justify-center p-4">
      <Text className="text-gold text-3xl font-bold">PanaHome</Text>
      <Text className="text-white text-lg mt-2">AI-Powered AR Real Estate</Text>
      <Link href="/(auth)/login" className="mt-6 bg-gold px-8 py-3 rounded-lg">
        <Text className="text-dark font-semibold">Get Started</Text>
      </Link>
    </View>
  );
}