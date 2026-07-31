import { View, Text, TouchableOpacity } from 'react-native';

interface ARControlsProps {
  onPlace?: () => void;
  onReset?: () => void;
  onRotate?: () => void;
}

export default function ARControls({ onPlace, onReset, onRotate }: ARControlsProps) {
  return (
    <View className="absolute bottom-0 left-0 right-0 bg-white p-4 flex-row justify-around border-t border-surface-container">
      <TouchableOpacity onPress={onPlace} className="bg-primary px-4 py-2 rounded-full">
        <Text className="text-on-primary font-semibold">Place</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={onReset} className="bg-primary px-4 py-2 rounded-full">
        <Text className="text-on-primary font-semibold">Reset</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={onRotate} className="bg-primary px-4 py-2 rounded-full">
        <Text className="text-on-primary font-semibold">Rotate</Text>
      </TouchableOpacity>
    </View>
  );
}
