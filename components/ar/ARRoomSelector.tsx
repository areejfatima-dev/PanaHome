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
    <View className="absolute top-0 left-0 right-0 bg-card p-4">
      <Text className="text-white font-semibold mb-2">Select Room</Text>
      <View className="flex-row flex-wrap">
        {rooms.map((room) => (
          <TouchableOpacity
            key={room}
            onPress={() => onSelect(room)}
            className={`px-4 py-2 rounded-lg mr-2 mb-2 ${
              selectedRoom === room ? 'bg-gold' : 'bg-dark'
            }`}
          >
            <Text
              className={selectedRoom === room ? 'text-dark font-semibold' : 'text-white'}
            >
              {room}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}