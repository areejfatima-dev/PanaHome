import { View, Text } from 'react-native';

export default function ScheduleAppointment() {
  return (
    <View className="flex-1 bg-dark p-4">
      <Text className="text-gold text-2xl font-bold mb-4">Schedule Appointment</Text>
      <Text className="text-white">Schedule a viewing appointment.</Text>
    </View>
  );
}