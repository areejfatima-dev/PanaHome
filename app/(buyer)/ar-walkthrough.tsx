import { View, Text, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';

export default function ArWalkthrough() {
  return (
    <View className="flex-1">
      {/* AR viewport */}
      <View className="flex-1 bg-primary items-center justify-center">
        {/* Scan frame */}
        <View className="absolute inset-x-10 top-20 border-2 border-white/30 rounded-[24px] h-2/3 items-center justify-center">
          <View className="absolute -top-0.5 -left-0.5 w-8 h-8 border-t-4 border-l-4 border-white rounded-tl-[22px]" />
          <View className="absolute -top-0.5 -right-0.5 w-8 h-8 border-t-4 border-r-4 border-white rounded-tr-[22px]" />
          <View className="absolute -bottom-0.5 -left-0.5 w-8 h-8 border-b-4 border-l-4 border-white rounded-bl-[22px]" />
          <View className="absolute -bottom-0.5 -right-0.5 w-8 h-8 border-b-4 border-r-4 border-white rounded-br-[22px]" />
          <View className="items-center">
            <MaterialIcons name="house" size={72} color="rgba(255,255,255,0.85)" />
            <Text className="text-white/80 text-sm mt-4 font-medium">
              Move your phone to explore the room
            </Text>
          </View>
        </View>

        {/* Top bar */}
        <View className="absolute top-12 left-5 right-5 flex-row items-center justify-between">
          <Link href="/(buyer)/home" className="w-10 h-10 bg-white/20 backdrop-blur rounded-full items-center justify-center">
            <MaterialIcons name="arrow-back" size={22} color="#fff" />
          </Link>
          <View className="bg-white/20 backdrop-blur px-4 py-2 rounded-full flex-row items-center gap-2">
            <MaterialIcons name="navigation" size={16} color="#fff" />
            <Text className="text-white text-sm font-semibold">Living Room • Level 42</Text>
          </View>
        </View>

        {/* AR overlays */}
        <View className="absolute top-36 left-8 bg-white/90 rounded-[12px] p-2.5 max-w-[160px] shadow-lg">
          <Text className="text-[10px] font-bold text-primary flex-row items-center">
            <MaterialIcons name="info" size={12} color="#835400" /> High Ceilings (3.2m)
          </Text>
        </View>
        <View className="absolute top-56 right-8 bg-white/90 rounded-[12px] p-2.5 max-w-[160px] shadow-lg">
          <Text className="text-[10px] font-bold text-primary flex-row items-center">
            <MaterialIcons name="texture" size={12} color="#835400" /> Italian Marble Finish
          </Text>
        </View>

        {/* Bottom controls */}
        <View className="absolute bottom-10 left-5 right-5">
          <View className="flex-row justify-center gap-4">
            <TouchableOpacity className="w-14 h-14 bg-white/20 backdrop-blur rounded-full items-center justify-center">
              <MaterialIcons name="chair" size={26} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity className="w-14 h-14 bg-white/20 backdrop-blur rounded-full items-center justify-center">
              <MaterialIcons name="square-foot" size={26} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity className="w-16 h-16 bg-secondary rounded-full items-center justify-center border-4 border-white/30 shadow-xl">
              <MaterialIcons name="photo-camera" size={30} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity className="w-14 h-14 bg-white/20 backdrop-blur rounded-full items-center justify-center">
              <MaterialIcons name="photo-library" size={26} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity className="w-14 h-14 bg-white/20 backdrop-blur rounded-full items-center justify-center">
              <MaterialIcons name="help" size={26} color="#fff" />
            </TouchableOpacity>
          </View>
          <View className="flex-row justify-center items-center gap-2 mt-6">
            <View className="bg-white/90 px-3 py-1.5 rounded-full">
              <Text className="text-primary text-xs font-semibold">AR WALKTHROUGH ACTIVE</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}
