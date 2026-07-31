import { View, Text, TouchableOpacity, ScrollView } from 'react-native';

export default function Step5Review() {
  return (
    <ScrollView className="flex-1 bg-dark p-6">
      <Text className="text-gold text-2xl font-bold mb-4">Step 5: Review</Text>
      <Text className="text-white text-lg mb-6">Review and submit your property</Text>

      <View className="bg-card p-4 rounded-lg mb-6">
        <Text className="text-white font-semibold">Property Title</Text>
        <Text className="text-gray-400 mt-1">Luxury Villa</Text>
      </View>

      <View className="bg-card p-4 rounded-lg mb-6">
        <Text className="text-white font-semibold">Price</Text>
        <Text className="text-gray-400 mt-1">$500,000</Text>
      </View>

      <View className="bg-card p-4 rounded-lg mb-6">
        <Text className="text-white font-semibold">Rooms</Text>
        <Text className="text-gray-400 mt-1">3 Bedrooms, 2 Bathrooms</Text>
      </View>

      <TouchableOpacity className="bg-gold py-3 rounded-lg items-center">
        <Text className="text-dark font-semibold text-lg">Submit for Review</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}