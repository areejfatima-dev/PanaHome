import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';

export default function ForgotPassword() {
  return (
    <View className="flex-1 bg-dark p-6 justify-center">
      <Text className="text-gold text-3xl font-bold mb-2">Forgot Password</Text>
      <Text className="text-white text-lg mb-8">
        Enter your email to reset your password
      </Text>

      <TextInput
        placeholder="Email"
        placeholderTextColor="#888"
        className="bg-card text-white p-4 rounded-lg mb-6"
      />

      <TouchableOpacity className="bg-gold py-3 rounded-lg items-center mb-4">
        <Text className="text-dark font-semibold text-lg">Send Reset Link</Text>
      </TouchableOpacity>

      <Link href="/(auth)/login" className="mt-4">
        <Text className="text-white text-center">
          Remember your password?{' '}
          <Text className="text-gold font-semibold">Sign In</Text>
        </Text>
      </Link>
    </View>
  );
}