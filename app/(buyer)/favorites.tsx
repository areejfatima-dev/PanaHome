import { View, Text } from 'react-native';

export default function Favorites() {
  return (
    <View className="flex-1 bg-dark p-4">
      <Text className="text-gold text-2xl font-bold mb-4">My Favorites</Text>
      <Text className="text-white">Your favorite properties will appear here.</Text>
    </View>
  );
}