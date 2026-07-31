import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';

export default function Signup() {
  return (
    <View className="flex-1 bg-dark p-6 justify-center">
      <Text className="text-gold text-3xl font-bold mb-2">Create Account</Text>
      <Text className="text-white text-lg mb-8">Join PanaHome</Text>

      <TextInput
        placeholder="Full Name"
        placeholderTextColor="#888"
        className="bg-card text-white p-4 rounded-lg mb-4"
      />
      <TextInput
        placeholder="Email"
        placeholderTextColor="#888"
        className="bg-card text-white p-4 rounded-lg mb-4"
      />
      <TextInput
        placeholder="Password"
        placeholderTextColor="#888"
        secureTextEntry
        className="bg-card text-white p-4 rounded-lg mb-6"
      />

      <TouchableOpacity className="bg-gold py-3 rounded-lg items-center mb-4">
        <Text className="text-dark font-semibold text-lg">Sign Up</Text>
      </TouchableOpacity>

      <Link href="/(auth)/login" className="mb-6">
        <Text className="text-white text-center">
          Already have an account?{' '}
          <Text className="text-gold font-semibold">Sign In</Text>
        </Text>
      </Link>
    </View>
  );
}