import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';

export default function Login() {
  return (
    <View className="flex-1 bg-dark p-6 justify-center">
      <Text className="text-gold text-3xl font-bold mb-2">Welcome Back</Text>
      <Text className="text-white text-lg mb-8">Sign in to PanaHome</Text>

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
        <Text className="text-dark font-semibold text-lg">Sign In</Text>
      </TouchableOpacity>

      <Link href="/(auth)/forgot-password" className="mb-4">
        <Text className="text-gold text-center">Forgot Password?</Text>
      </Link>

      <Link href="/(auth)/signup" className="mb-6">
        <Text className="text-white text-center">
          Don{"'"}t have an account?{' '}
          <Text className="text-gold font-semibold">Sign Up</Text>
        </Text>
      </Link>
    </View>
  );
}