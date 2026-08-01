import { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';

export default function RoleSelect() {
  const [role, setRole] = useState<'seller' | 'buyer'>('buyer');

  return (
    <View className="flex-1 bg-background">
      <View className="flex-1 justify-center px-8">
        <View className="items-center mb-10">
          <View className="w-20 h-20 bg-primary rounded-[22px] items-center justify-center shadow-xl mb-6">
            <MaterialIcons name="home" size={40} color="#fff" />
          </View>
          <Text className="text-[30px] font-bold text-primary text-center">How will you use PanaHome?</Text>
          <Text className="text-on-surface-variant text-base text-center mt-3 leading-6 max-w-[300px]">
            Tailor your premium real estate experience by selecting your primary goal today.
          </Text>
        </View>

        <View className="gap-4 mb-8">
          <TouchableOpacity
            onPress={() => setRole('seller')}
            className={`flex-row items-center gap-4 rounded-[20px] p-5 border-2 ${
              role === 'seller'
                ? 'bg-white border-primary shadow-lg'
                : 'bg-white border-surface-container-low shadow-none'
            }`}
          >
            <View className={`w-12 h-12 rounded-full items-center justify-center ${role === 'seller' ? 'bg-primary' : 'bg-surface-container-high'}`}>
              <MaterialIcons name="house" size={24} color={role === 'seller' ? '#fff' : '#44474f'} />
            </View>
            <View className="flex-1">
              <Text className="text-primary font-bold text-lg">I{`'`}m a Seller</Text>
              <Text className="text-on-surface-variant text-xs mt-1 leading-5">
                List your property with AI-driven valuation and premium visibility.
              </Text>
            </View>
            {role === 'seller' && <MaterialIcons name="check-circle" size={24} color="#835400" />}
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setRole('buyer')}
            className={`flex-row items-center gap-4 rounded-[20px] p-5 border-2 ${
              role === 'buyer'
                ? 'bg-white border-primary shadow-lg'
                : 'bg-white border-surface-container-low shadow-none'
            }`}
          >
            <View className={`w-12 h-12 rounded-full items-center justify-center ${role === 'buyer' ? 'bg-primary' : 'bg-surface-container-high'}`}>
              <MaterialIcons name="key" size={24} color={role === 'buyer' ? '#fff' : '#44474f'} />
            </View>
            <View className="flex-1">
              <Text className="text-primary font-bold text-lg">I{`'`}m a Buyer</Text>
              <Text className="text-on-surface-variant text-xs mt-1 leading-5">
                Explore exclusive listings with AR-enabled tours and smart investment data.
              </Text>
            </View>
            {role === 'buyer' && <MaterialIcons name="check-circle" size={24} color="#835400" />}
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          onPress={() => router.push(role === 'buyer' ? '/(buyer)/home' : '/(seller)/dashboard')}
          className="w-full py-4 bg-primary rounded-full items-center flex-row justify-center shadow-lg"
        >
          <Text className="text-on-primary font-semibold text-base mr-2">Continue</Text>
          <MaterialIcons name="arrow-forward" size={20} color="#fff" />
        </TouchableOpacity>

        <Text className="text-center text-outline text-xs mt-8 flex-row items-center justify-center gap-1">
          Safe & AI-Verified Transactions
        </Text>

        <TouchableOpacity
          onPress={() => router.push('/(admin)/dashboard')}
          className="mt-6 self-center flex-row items-center gap-1"
        >
          <Text className="text-on-surface-variant text-xs">
            Admin access?{' '}
          </Text>
          <Text className="text-secondary font-semibold text-xs">
            Enter Admin Panel
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
