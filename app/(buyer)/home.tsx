import { View, Text, ScrollView } from 'react-native';
import { Link } from 'expo-router';

export default function BuyerHome() {
  return (
    <ScrollView className="flex-1 bg-dark p-4">
      <Text className="text-gold text-2xl font-bold mb-4">Buyer Dashboard</Text>
      <Text className="text-white text-lg mb-6">Browse properties and manage your account</Text>

      <View className="bg-card p-4 rounded-lg mb-4">
        <Text className="text-white font-semibold">Available Properties</Text>
        <Text className="text-gray-400 mt-1">View listings near you</Text>
      </View>

      <Link href="/(buyer)/favorites" className="bg-card p-4 rounded-lg mb-4">
        <Text className="text-white font-semibold">My Favorites</Text>
      </Link>

      <Link href="/(buyer)/history" className="bg-card p-4 rounded-lg mb-4">
        <Text className="text-white font-semibold">Viewing History</Text>
      </Link>

      <Link href="/(buyer)/schedule-appointment" className="bg-card p-4 rounded-lg mb-4">
        <Text className="text-white font-semibold">Schedule Appointment</Text>
      </Link>

      <Link href="/(buyer)/ar-walkthrough" className="bg-card p-4 rounded-lg mb-4">
        <Text className="text-white font-semibold">AR Walkthrough</Text>
      </Link>

      <Link href="/(buyer)/ar-furniture-placement" className="bg-card p-4 rounded-lg mb-4">
        <Text className="text-white font-semibold">AR Furniture Placement</Text>
      </Link>
    </ScrollView>
  );
}