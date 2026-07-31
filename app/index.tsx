import { View, Text, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';

const FEATURES = [
  { icon: 'view-in-ar', title: 'Walk through homes in true AR', subtitle: 'Using just 6 photos' },
  { icon: 'chair', title: 'Place virtual furniture', subtitle: 'And see what fits' },
  { icon: 'verified', title: 'Verified listings, real prices', subtitle: 'Zero fake photos' },
];

export default function Index() {
  return (
    <View className="flex-1 bg-background">
      <View className="flex-1 justify-center px-8">
        <View className="items-center mb-10">
          <View className="w-20 h-20 bg-primary rounded-[22px] items-center justify-center shadow-xl mb-6">
            <MaterialIcons name="home" size={40} color="#fff" />
          </View>
          <Text className="text-[34px] font-bold text-primary">Welcome Home</Text>
          <Text className="text-on-surface-variant text-base text-center mt-3 leading-6">
            Discover your future residence with our advanced AR property engine.
          </Text>
        </View>

        <View className="gap-4 mb-10">
          {FEATURES.map((f) => (
            <View key={f.title} className="flex-row items-center gap-4 bg-white rounded-[18px] p-4 border border-surface-container-low shadow-sm">
              <View className="w-12 h-12 bg-secondary-container rounded-full items-center justify-center">
                <MaterialIcons name={f.icon as any} size={24} color="#714800" />
              </View>
              <View className="flex-1">
                <Text className="text-primary font-bold text-[15px]">{f.title}</Text>
                <Text className="text-on-surface-variant text-xs mt-0.5">{f.subtitle}</Text>
              </View>
            </View>
          ))}
        </View>

        <Link href="/role-select" asChild>
          <TouchableOpacity className="w-full py-4 bg-primary rounded-full items-center shadow-lg">
            <Text className="text-on-primary font-semibold text-base">Get Started</Text>
          </TouchableOpacity>
        </Link>
        <Link href="/(auth)/login" className="mt-5 self-center">
          <Text className="text-on-surface-variant text-sm">
            Already have an account? <Text className="text-secondary font-semibold">Log in</Text>
          </Text>
        </Link>
      </View>
    </View>
  );
}
