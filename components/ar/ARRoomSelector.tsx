import { View, Text, TouchableOpacity } from 'react-native';

interface ARRoomSelectorProps {
  rooms: string[];
  selectedRoom: string | null;
  onSelect: (room: string) => void;
}

export default function ARRoomSelector({
  rooms,
  selectedRoom,
  onSelect,
}: ARRoomSelectorProps) {
  return (
    <View className="absolute top-0 left-0 right-0 bg-white p-4 border-b border-surface-container">
      <Text className="text-primary font-semibold mb-2">Select Room</Text>
      <View className="flex-row flex-wrap">
        {rooms.map((room) => (
          <TouchableOpacity
            key={room}
            onPress={() => onSelect(room)}
            className={`px-4 py-2 rounded-full mr-2 mb-2 ${
              selectedRoom === room ? 'bg-primary' : 'bg-surface-container-low'
            }`}
          >
            <Text
              className={selectedRoom === room ? 'text-on-primary font-semibold' : 'text-on-surface-variant'}
            >
              {room}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}
