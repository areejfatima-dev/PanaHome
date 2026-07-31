import { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import { Link } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';

const SUGGESTIONS = [
  'Investments in London',
  'Villas with 3D tours',
  'Near Central Park',
  'Recently listed lofts',
];

export default function AiAssistant() {
  const [listening, setListening] = useState(false);

  return (
    <View className="flex-1 bg-background">
      <View className="flex-1 justify-center px-8">
        {/* Close */}
        <Link href="/(buyer)/home" className="absolute top-14 right-6 w-10 h-10 bg-white rounded-full items-center justify-center shadow-sm">
          <MaterialIcons name="close" size={22} color="#03224d" />
        </Link>

        {/* Title */}
        <Text className="text-[26px] font-bold text-primary text-center mb-2">Luxury Estates AI</Text>

        {/* Mic */}
        <View className="items-center my-10">
          <TouchableOpacity
            onPress={() => setListening(!listening)}
            className={`w-32 h-32 rounded-full items-center justify-center ${
              listening ? 'bg-secondary' : 'bg-primary'
            } shadow-2xl`}
          >
            {listening ? (
              <MaterialIcons name="graphic-eq" size={52} color="#fff" />
            ) : (
              <MaterialIcons name="mic" size={52} color="#fff" />
            )}
          </TouchableOpacity>
          <Text className="text-on-surface-variant mt-4 text-sm">
            {listening ? 'Listening... tap to stop' : 'Tap to speak'}
          </Text>
          {listening && (
            <View className="mt-6 items-center">
              <View className="flex-row gap-2">
                {[0, 1, 2].map((i) => (
                  <View key={i} className="w-3 h-3 bg-secondary-container rounded-full" />
                ))}
              </View>
            </View>
          )}
        </View>

        {/* Input */}
        <View className="flex-row items-center bg-white rounded-full border border-surface-container px-5 py-3.5 shadow-sm">
          <MaterialIcons name="search" size={20} color="#747780" />
          <TextInput
            placeholder="Find me a modern penthouse with a sea view in Dubai Marina..."
            placeholderTextColor="#747780"
            className="flex-1 ml-2 text-sm text-on-surface"
          />
        </View>

        {/* Suggestions */}
        <View className="mt-8">
          <Text className="text-on-surface-variant text-xs font-semibold uppercase tracking-wider mb-3">
            Try asking
          </Text>
          {SUGGESTIONS.map((s) => (
            <TouchableOpacity key={s} className="flex-row items-center gap-3 py-2.5">
              <MaterialIcons name="north-east" size={16} color="#835400" />
              <Text className="text-primary text-sm">{s}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text className="text-center text-outline text-[10px] mt-10">POWERED BY LUXE AI</Text>
      </View>
    </View>
  );
}
