import { View, Text, TouchableOpacity } from 'react-native';

interface ARControlsProps {
  onPlace?: () => void;
  onReset?: () => void;
  onRotate?: () => void;
}

export default function ARControls({ onPlace, onReset, onRotate }: ARControlsProps) {
  return (
    <View className="absolute bottom-0 left-0 right-0 bg-card p-4 flex-row justify-around">
      <TouchableOpacity onPress={onPlace} className="bg-gold px-4 py-2 rounded-lg">
        <Text className="text-dark font-semibold">Place</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={onReset} className="bg-gold px-4 py-2 rounded-lg">
        <Text className="text-dark font-semibold">Reset</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={onRotate} className="bg-gold px-4 py-2 rounded-lg">
        <Text className="text-dark font-semibold">Rotate</Text>
      </TouchableOpacity>
    </View>
  );
}