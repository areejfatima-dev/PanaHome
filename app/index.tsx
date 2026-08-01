import { useRef, useState } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, Dimensions, NativeScrollEvent, NativeSyntheticEvent } from 'react-native';
import { Link } from 'expo-router';

const { width } = Dimensions.get('window');

const SLIDES = [
  {
    image: require('../assets/images/onboarding/hero-1.jpg'),
    title: 'Walk through homes in true AR using just 6 photos',
  },
  {
    image: require('../assets/images/onboarding/hero-2.jpg'),
    title: 'Place virtual furniture and see what fits',
  },
  {
    image: require('../assets/images/onboarding/hero-3.jpg'),
    title: 'Verified listings, real prices, zero fake photos',
  },
];

export default function Index() {
  const scrollRef = useRef<ScrollView>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const cardWidth = width - 48;

  const onScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const index = Math.round(e.nativeEvent.contentOffset.x / (cardWidth + 16));
    setActiveIndex(Math.max(0, Math.min(SLIDES.length - 1, index)));
  };

  return (
    <View className="flex-1 bg-background">
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', paddingVertical: 48 }}
        className="flex-1"
      >
        <View className="w-full items-center px-6">
          <View className="items-center mb-8">
            <Text className="text-primary text-4xl font-bold mb-2 text-center">
              Welcome Home
            </Text>
            <Text className="text-on-surface-variant text-base text-center leading-6 max-w-xs">
              Discover your future residence with our advanced AR property engine.
            </Text>
          </View>

          <ScrollView
            ref={scrollRef}
            horizontal
            showsHorizontalScrollIndicator={false}
            snapToInterval={cardWidth + 16}
            decelerationRate="fast"
            onScroll={onScroll}
            scrollEventThrottle={16}
            contentContainerStyle={{ gap: 16, paddingHorizontal: 8 }}
          >
            {SLIDES.map((slide, i) => (
              <View
                key={i}
                className="bg-white rounded-[20px] overflow-hidden shadow-lg"
                style={{ width: cardWidth, height: 440 }}
              >
                <View className="flex-1">
                  <Image source={slide.image} className="w-full h-full" resizeMode="cover" />
                  <View className="absolute inset-x-0 bottom-0" style={{ height: '60%', backgroundColor: 'rgba(255,255,255,0.55)' }} />
                  <View className="absolute bottom-0 p-6">
                    <Text className="text-primary font-bold text-lg leading-tight">
                      {slide.title}
                    </Text>
                  </View>
                </View>
              </View>
            ))}
          </ScrollView>

          <View className="flex-row justify-center gap-2 mt-6">
            {SLIDES.map((_, i) => (
              <View
                key={i}
                className="rounded-full"
                style={{
                  width: i === activeIndex ? 24 : 8,
                  height: 8,
                  backgroundColor: i === activeIndex ? '#03224d' : '#c4c6d0',
                }}
              />
            ))}
          </View>

          <View className="w-full mt-8 flex-col gap-4">
            <Link href="/role-select" asChild>
              <TouchableOpacity className="w-full bg-primary py-5 rounded-full items-center shadow-lg">
                <Text className="text-on-primary font-semibold text-base">Get Started</Text>
              </TouchableOpacity>
            </Link>
            <Link href="/(auth)/login" className="self-center">
              <Text className="text-on-surface-variant text-sm">
                Already have an account?{' '}
                <Text className="text-primary font-bold">Log in</Text>
              </Text>
            </Link>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
