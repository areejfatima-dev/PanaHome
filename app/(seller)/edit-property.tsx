import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { Link } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';

export default function EditProperty() {
  const [price, setPrice] = useState('1250000');

  return (
    <View className="flex-1 bg-background">
      <ScrollView className="flex-1" contentContainerStyle={{ paddingBottom: 40 }}>
        <View className="px-5 pt-4 flex-row items-center gap-3">
          <Link href="/(seller)/dashboard" className="w-10 h-10 items-center justify-center">
            <MaterialIcons name="arrow-back" size={24} color="#03224d" />
          </Link>
          <Text className="text-[22px] font-bold text-primary">Edit Property</Text>
          <View className="flex-1" />
          <Link href="/(seller)/add-property/step-5-review" className="w-10 h-10 bg-primary rounded-full items-center justify-center">
            <MaterialIcons name="send" size={18} color="#fff" />
          </Link>
        </View>

        {/* Images */}
        <View className="mx-5 mt-4">
          <View className="h-44 bg-primary rounded-[20px] items-center justify-center relative">
            <MaterialIcons name="apartment" size={48} color="#ffffff80" />
            <View className="absolute bottom-3 right-3 bg-white/90 rounded-full px-3 py-1.5 flex-row items-center gap-1">
              <MaterialIcons name="photo-camera" size={14} color="#03224d" />
              <Text className="text-primary text-xs font-bold">Edit Photos</Text>
            </View>
          </View>
        </View>

        <View className="mx-5 mt-5 bg-white rounded-[20px] shadow-sm border border-surface-container-low p-5">
          <Text className="text-[16px] font-bold text-primary mb-4">Property Details</Text>

          <Text className="text-on-surface-variant text-sm font-semibold mb-2">Property Title</Text>
          <TextInput
            defaultValue="Skyline Horizon Villa"
            placeholderTextColor="#747780"
            className="bg-surface-container-low rounded-[14px] px-4 py-3.5 text-on-surface mb-4"
          />

          <Text className="text-on-surface-variant text-sm font-semibold mb-2">Description</Text>
          <TextInput
            defaultValue="A stunning example of contemporary architecture with premium finishes throughout..."
            placeholderTextColor="#747780"
            multiline
            numberOfLines={3}
            className="bg-surface-container-low rounded-[14px] px-4 py-3.5 text-on-surface min-h-[90px] mb-4"
          />

          <View className="flex-row gap-3 mb-4">
            <View className="flex-1">
              <Text className="text-on-surface-variant text-sm font-semibold mb-2">Bedrooms</Text>
              <View className="flex-row items-center bg-surface-container-low rounded-[14px] px-4 py-3.5">
                <Text className="flex-1 text-on-surface font-bold">5</Text>
                <MaterialIcons name="bed" size={18} color="#835400" />
              </View>
            </View>
            <View className="flex-1">
              <Text className="text-on-surface-variant text-sm font-semibold mb-2">Bathrooms</Text>
              <View className="flex-row items-center bg-surface-container-low rounded-[14px] px-4 py-3.5">
                <Text className="flex-1 text-on-surface font-bold">6</Text>
                <MaterialIcons name="bathtub" size={18} color="#835400" />
              </View>
            </View>
            <View className="flex-1">
              <Text className="text-on-surface-variant text-sm font-semibold mb-2">Area (sqft)</Text>
              <View className="flex-row items-center bg-surface-container-low rounded-[14px] px-4 py-3.5">
                <Text className="flex-1 text-on-surface font-bold">6,200</Text>
                <MaterialIcons name="square-foot" size={18} color="#835400" />
              </View>
            </View>
          </View>
        </View>

        {/* Pricing */}
        <View className="mx-5 mt-5 bg-white rounded-[20px] shadow-sm border border-surface-container-low p-5">
          <Text className="text-[16px] font-bold text-primary mb-4">Pricing</Text>
          <View className="flex-row items-center bg-surface-container-low rounded-[14px] px-4 py-3.5 mb-3">
            <Text className="text-on-surface-variant font-semibold mr-2">$</Text>
            <TextInput
              value={price}
              onChangeText={setPrice}
              placeholderTextColor="#747780"
              keyboardType="numeric"
              className="flex-1 text-on-surface"
            />
          </View>
          <View className="bg-secondary-container/40 rounded-[14px] px-4 py-3">
            <Text className="text-on-secondary-container text-xs font-bold">AI Range: $4.2M - $4.9M</Text>
            <Text className="text-on-surface-variant text-[11px] mt-0.5">Current listing is within market range.</Text>
          </View>
        </View>

        <View className="flex-row gap-3 px-5 mt-8">
          <TouchableOpacity className="flex-1 py-4 border-2 border-error/30 rounded-full items-center flex-row justify-center">
            <MaterialIcons name="delete" size={18} color="#ba1a1a" style={{ marginRight: 6 }} />
            <Text className="text-error font-semibold">Delete</Text>
          </TouchableOpacity>
          <TouchableOpacity className="flex-1 py-4 bg-primary rounded-full items-center">
            <Text className="text-on-primary font-semibold">Save Changes</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
