import { View, Text, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';

const FEATURED = [
  {
    id: '1',
    title: 'Skyline Vista Penthouse',
    price: '$2,450,000',
    location: 'Manhattan, NY',
    beds: 4,
    baths: 3,
    sqft: '3,200',
    rating: '4.9',
    badge: 'AI-Verified',
  },
  {
    id: '2',
    title: 'Emerald Grove Villa',
    price: '$1,890,000',
    location: 'Austin, TX',
    beds: 5,
    baths: 4,
    sqft: '4,500',
    rating: '4.8',
    badge: 'AI-Verified',
  },
];

const RECOMMENDED = [
  {
    id: '3',
    title: 'The Azure Loft',
    price: '$950,000',
    location: 'Brooklyn, NY • 2.4 miles away',
    beds: 2,
    baths: 2,
    ai: true,
  },
  {
    id: '4',
    title: 'Harborview Manor',
    price: '$1,250,000',
    location: 'Greenwich, CT • 15 miles away',
    beds: 3,
    baths: 3,
    ai: true,
  },
  {
    id: '5',
    title: 'Zenith Studio',
    price: '$720,000',
    location: 'Los Angeles, CA • Local area',
    beds: 1,
    baths: 1,
    ai: true,
  },
];

const CHIPS = ['All', 'Houses', 'Apartments', 'AR-Ready', 'Verified Only'];

export default function BuyerHome() {
  return (
    <View className="flex-1 bg-background">
      <ScrollView className="flex-1" contentContainerStyle={{ paddingBottom: 120 }}>
        {/* Top App Bar */}
        <View className="flex-row justify-between items-center px-5 py-3">
          <View className="flex-row items-center gap-3">
            <View className="w-10 h-10 rounded-full bg-surface-container-high ring-2 ring-primary/10 items-center justify-center">
              <MaterialIcons name="person" size={22} color="#03224d" />
            </View>
            <Text className="text-[24px] font-bold text-primary">Hi Ahmed 👋</Text>
          </View>
          <TouchableOpacity className="w-10 h-10 items-center justify-center rounded-full bg-surface-container-lowest shadow-sm">
            <MaterialIcons name="notifications" size={22} color="#03224d" />
          </TouchableOpacity>
        </View>

        {/* Search & Filter */}
        <View className="flex-row items-center gap-3 px-5 mt-4">
          <View className="flex-1 flex-row items-center bg-white rounded-full shadow-sm border border-surface-container px-4 py-3">
            <MaterialIcons name="search" size={20} color="#747780" />
            <TextInput
              placeholder="Search dream homes..."
              placeholderTextColor="#747780"
              className="flex-1 ml-2 text-base text-on-surface"
            />
            <MaterialIcons name="mic" size={20} color="#747780" />
          </View>
          <TouchableOpacity className="w-12 h-12 items-center justify-center rounded-full bg-primary">
            <MaterialIcons name="tune" size={22} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* Category Chips */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="mt-5"
          contentContainerStyle={{ paddingHorizontal: 20, gap: 12 }}
        >
          {CHIPS.map((chip, i) => (
            <TouchableOpacity
              key={chip}
              className={`px-6 py-2.5 rounded-full ${i === 0 ? 'bg-primary' : 'bg-white border border-surface-container'}`}
            >
              <Text className={`text-sm font-semibold ${i === 0 ? 'text-on-primary' : 'text-on-surface-variant'}`}>
                {chip}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Featured Properties */}
        <View className="mt-8">
          <View className="flex-row justify-between items-center px-5 mb-4">
            <Text className="text-[22px] font-bold text-primary">Featured Properties</Text>
            <TouchableOpacity>
              <Text className="text-secondary text-sm font-semibold">View All</Text>
            </TouchableOpacity>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 20, gap: 20, paddingBottom: 6 }}
          >
            {FEATURED.map((p) => (
              <TouchableOpacity
                key={p.id}
                className="w-[300px] bg-white rounded-[20px] shadow-md overflow-hidden active:scale-[0.98]"
              >
                <View className="relative h-56 bg-surface-container-high">
                  <View className="absolute top-4 left-4 flex-row items-center gap-1 bg-white/70 rounded-full px-3 py-1">
                    <MaterialIcons name="star" size={16} color="#835400" />
                    <Text className="text-xs font-bold text-primary">{p.rating}</Text>
                  </View>
                  <View className="absolute top-4 right-4 bg-primary/20 rounded-full p-2">
                    <MaterialIcons name="favorite" size={20} color="#fff" />
                  </View>
                  <View className="absolute bottom-4 left-4 bg-secondary px-2 py-1 rounded">
                    <Text className="text-white text-[10px] font-bold uppercase tracking-wider">{p.badge}</Text>
                  </View>
                </View>
                <View className="p-5">
                  <View className="flex-row justify-between items-start mb-2">
                    <Text className="text-lg font-semibold text-primary flex-shrink">{p.title}</Text>
                    <Text className="font-bold text-secondary text-lg">{p.price}</Text>
                  </View>
                  <Text className="text-on-surface-variant text-sm mb-4 flex-row items-center">
                    <MaterialIcons name="location-on" size={16} color="#44474f" /> {p.location}
                  </Text>
                  <View className="flex-row gap-4 border-t border-surface-container pt-4">
                    <Text className="flex-row items-center gap-1 text-on-surface-variant text-xs">
                      <MaterialIcons name="bed" size={18} color="#44474f" /> {p.beds} Beds
                    </Text>
                    <Text className="flex-row items-center gap-1 text-on-surface-variant text-xs">
                      <MaterialIcons name="bathtub" size={18} color="#44474f" /> {p.baths} Baths
                    </Text>
                    <Text className="flex-row items-center gap-1 text-on-surface-variant text-xs">
                      <MaterialIcons name="square-foot" size={18} color="#44474f" /> {p.sqft} sqft
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Recommended for you */}
        <View className="mt-8 px-5">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-[22px] font-bold text-primary">Recommended for you</Text>
            <Text className="text-xs text-on-surface-variant bg-surface-container px-3 py-1 rounded-full">
              AI Curated
            </Text>
          </View>
          {RECOMMENDED.map((p) => (
            <TouchableOpacity
              key={p.id}
              className="flex-row gap-4 bg-white p-3 rounded-[20px] shadow-sm border border-surface-container-low mb-4"
            >
              <View className="w-28 h-28 rounded-[16px] bg-surface-container-high items-center justify-center">
                <MaterialIcons name="home" size={32} color="#747780" />
              </View>
              <View className="flex-1 py-1 justify-between">
                <View>
                  <View className="flex-row justify-between items-start gap-2">
                    <Text className="text-base font-bold text-primary flex-shrink">{p.title}</Text>
                    {p.ai && (
                      <View className="bg-secondary-container px-2 py-0.5 rounded flex-row items-center gap-1">
                        <MaterialIcons name="auto-awesome" size={12} color="#714800" />
                        <Text className="text-[10px] font-extrabold text-on-secondary-container">AI PRICE MATCH</Text>
                      </View>
                    )}
                  </View>
                  <Text className="text-on-surface-variant text-xs mt-1">{p.location}</Text>
                </View>
                <View className="flex-row justify-between items-center">
                  <Text className="text-primary font-bold text-lg">{p.price}</Text>
                  <View className="flex-row gap-3 text-on-surface-variant">
                    <Text className="flex-row items-center gap-1 text-xs">
                      <MaterialIcons name="bed" size={16} color="#44474f" /> {p.beds}
                    </Text>
                    <Text className="flex-row items-center gap-1 text-xs">
                      <MaterialIcons name="bathtub" size={16} color="#44474f" /> {p.baths}
                    </Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Bottom Nav Bar */}
      <View className="absolute bottom-6 left-6 right-6 flex-row justify-around items-center px-4 py-3 bg-white/70 backdrop-blur-xl border border-white/30 shadow-lg rounded-full">
        <Link href="/(buyer)/home" className="flex-col items-center justify-center">
          <MaterialIcons name="home" size={22} color="#835400" />
          <Text className="text-xs font-bold text-secondary">Home</Text>
        </Link>
        <Link href="/(buyer)/favorites" className="flex-col items-center justify-center">
          <MaterialIcons name="favorite" size={22} color="#44474f" />
          <Text className="text-xs font-semibold text-on-surface-variant">Favorites</Text>
        </Link>
        <View className="-mt-6">
          <Link href="/(buyer)/home" className="w-16 h-16 bg-primary rounded-full items-center justify-center shadow-lg">
            <MaterialIcons name="search" size={32} color="#fff" />
          </Link>
        </View>
        <Link href="/(buyer)/schedule-appointment" className="flex-col items-center justify-center">
          <MaterialIcons name="calendar-today" size={22} color="#44474f" />
          <Text className="text-xs font-semibold text-on-surface-variant">Appointments</Text>
        </Link>
        <Link href="/(buyer)/history" className="flex-col items-center justify-center">
          <MaterialIcons name="person" size={22} color="#44474f" />
          <Text className="text-xs font-semibold text-on-surface-variant">Profile</Text>
        </Link>
      </View>
    </View>
  );
}
