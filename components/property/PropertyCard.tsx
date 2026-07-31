import { View, Text, Image, TouchableOpacity } from 'react-native';

interface PropertyCardProps {
  id: string;
  title: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  area: number;
  imageUri?: string;
  onPress?: () => void;
}

export default function PropertyCard({
  id,
  title,
  price,
  bedrooms,
  bathrooms,
  area,
  imageUri,
  onPress,
}: PropertyCardProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="bg-card rounded-lg overflow-hidden mb-4"
    >
      {imageUri ? (
        <Image source={{ uri: imageUri }} className="w-full h-48" />
      ) : (
        <View className="w-full h-48 bg-dark items-center justify-center">
          <Text className="text-gray-400">No Image</Text>
        </View>
      )}
      <View className="p-4">
        <Text className="text-white font-semibold text-lg">{title}</Text>
        <Text className="text-gold font-bold text-xl mt-1">${price.toLocaleString()}</Text>
        <View className="flex-row justify-between mt-2">
          <Text className="text-gray-400">{bedrooms} beds</Text>
          <Text className="text-gray-400">{bathrooms} baths</Text>
          <Text className="text-gray-400">{area} sqft</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}