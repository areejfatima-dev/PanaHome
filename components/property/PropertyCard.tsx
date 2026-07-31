import { View, Text, Image, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

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
      className="bg-white rounded-[20px] shadow-sm border border-surface-container-low overflow-hidden mb-4"
    >
      {imageUri ? (
        <Image source={{ uri: imageUri }} className="w-full h-48" />
      ) : (
        <View className="w-full h-48 bg-surface-container-high items-center justify-center">
          <MaterialIcons name="house" size={40} color="#747780" />
        </View>
      )}
      <View className="p-4">
        <Text className="text-primary font-semibold text-lg">{title}</Text>
        <Text className="text-secondary font-bold text-xl mt-1">${price.toLocaleString()}</Text>
        <View className="flex-row justify-between mt-2">
          <Text className="flex-row items-center gap-1 text-on-surface-variant text-sm">
            <MaterialIcons name="bed" size={15} color="#44474f" /> {bedrooms} beds
          </Text>
          <Text className="flex-row items-center gap-1 text-on-surface-variant text-sm">
            <MaterialIcons name="bathtub" size={15} color="#44474f" /> {bathrooms} baths
          </Text>
          <Text className="flex-row items-center gap-1 text-on-surface-variant text-sm">
            <MaterialIcons name="square-foot" size={15} color="#44474f" /> {area} sqft
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
