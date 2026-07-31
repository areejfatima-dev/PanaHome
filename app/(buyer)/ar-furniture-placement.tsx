import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';

const FURNITURE = [
  { name: 'Luxe Armchair', icon: 'chair', selected: true },
  { name: 'Plush Sofa', icon: 'weekend' },
  { name: 'Pivot Table', icon: 'table-restaurant' },
  { name: 'Lunar Lamp', icon: 'highlight' },
  { name: 'Zen Rug', icon: 'crop-square' },
];

export default function ArFurniturePlacement() {
  return (
    <View className="flex-1">
      {/* AR viewport */}
      <View className="flex-1 bg-primary">
        {/* Floor plane */}
        <View className="absolute inset-0 items-center justify-center">
          <View className="w-56 h-56 border-2 border-white/40 rounded-full items-center justify-center bg-white/10">
            <MaterialIcons name="touch-app" size={56} color="rgba(255,255,255,0.9)" />
            <Text className="text-white/80 text-sm mt-3 font-medium">Tap on the floor to place furniture</Text>
          </View>
        </View>

        {/* Top bar */}
        <View className="absolute top-12 left-5 right-5 flex-row items-center justify-between">
          <Link href="/(buyer)/home" className="w-10 h-10 bg-white/20 backdrop-blur rounded-full items-center justify-center">
            <MaterialIcons name="arrow-back" size={22} color="#fff" />
          </Link>
          <View className="bg-white/20 backdrop-blur px-4 py-2 rounded-full">
            <Text className="text-white text-sm font-semibold">AR Staging • Living Room</Text>
          </View>
          <View className="flex-row gap-2">
            <TouchableOpacity className="w-10 h-10 bg-white/20 backdrop-blur rounded-full items-center justify-center">
              <MaterialIcons name="undo" size={20} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity className="w-10 h-10 bg-white/20 backdrop-blur rounded-full items-center justify-center">
              <MaterialIcons name="delete" size={20} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Furniture tray */}
        <View className="absolute bottom-6 left-5 right-5">
          <View className="flex-row justify-between items-center mb-3">
            <Text className="text-white text-lg font-bold">Living Room</Text>
            <TouchableOpacity className="flex-row items-center gap-1">
              <Text className="text-white/80 text-sm">See All</Text>
              <MaterialIcons name="chevron-right" size={18} color="#fff" />
            </TouchableOpacity>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ gap: 12 }}
          >
            {FURNITURE.map((f) => (
              <TouchableOpacity
                key={f.name}
                className={`w-24 py-3.5 rounded-[16px] items-center border ${
                  f.selected ? 'bg-secondary border-secondary shadow-lg' : 'bg-white/15 backdrop-blur border-white/30'
                }`}
              >
                <MaterialIcons name={f.icon as any} size={26} color={f.selected ? '#fff' : '#fff'} />
                <Text className="text-white text-xs font-semibold mt-2 text-center">{f.name}</Text>
                {f.selected && (
                  <View className="absolute top-2 right-2 bg-white rounded-full p-0.5">
                    <MaterialIcons name="check" size={12} color="#835400" />
                  </View>
                )}
              </TouchableOpacity>
            ))}
          </ScrollView>
          <TouchableOpacity className="mt-4 bg-white rounded-full py-4 items-center flex-row justify-center shadow-xl">
            <MaterialIcons name="save" size={18} color="#03224d" style={{ marginRight: 8 }} />
            <Text className="text-primary font-bold">Save Layout</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
