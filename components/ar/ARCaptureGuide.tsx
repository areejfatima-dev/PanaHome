import { View, Text } from 'react-native';

export default function ARCaptureGuide() {
  return (
    <View className="absolute top-0 left-0 right-0 bg-card/80 p-4">
      <Text className="text-white font-semibold mb-2">Capture Guide</Text>
      <Text className="text-white">
        Capture 6 photos from different angles for the virtual walkthrough.
      </Text>
    </View>
  );
}