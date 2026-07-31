import { View, Text } from 'react-native';

export default function ARCaptureGuide() {
  return (
    <View className="absolute top-0 left-0 right-0 bg-white/90 p-4">
      <Text className="text-primary font-semibold mb-2">Capture Guide</Text>
      <Text className="text-on-surface-variant">
        Capture 6 photos from different angles for the virtual walkthrough.
      </Text>
    </View>
  );
}
