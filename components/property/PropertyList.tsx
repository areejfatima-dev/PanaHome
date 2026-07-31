import { View, FlatList, Text } from 'react-native';
import PropertyCard from './PropertyCard';
import { Property } from '@/types/property';

interface PropertyListProps {
  properties: Property[];
  onPropertyPress?: (property: Property) => void;
}

export default function PropertyList({
  properties,
  onPropertyPress,
}: PropertyListProps) {
  if (properties.length === 0) {
    return (
      <View className="flex-1 items-center justify-center bg-dark">
        <Text className="text-gray-400">No properties found</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={properties}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <PropertyCard
          id={item.id}
          title={item.title}
          price={item.price}
          bedrooms={item.bedrooms}
          bathrooms={item.bathrooms}
          area={item.area}
          imageUri={item.images?.[0]}
          onPress={() => onPropertyPress?.(item)}
        />
      )}
      contentContainerStyle={{ backgroundColor: '#0A0A0A' }}
    />
  );
}