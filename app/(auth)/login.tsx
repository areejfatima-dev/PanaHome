import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { Link, useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { signIn } from '@/services/authService';
import { useAuthStore } from '@/store/authStore';

export default function Login() {
  const router = useRouter();
  const { setUser } = useAuthStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setError('');
    if (!email) {
      setError('Please enter your email address.');
      return;
    }
    if (!password) {
      setError('Please enter your password.');
      return;
    }
    setLoading(true);
    try {
      const user = await signIn(email, password);
      setUser(user);
      router.replace('/(buyer)/home');
    } catch (e: any) {
      setError(e?.message || 'Invalid credentials. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-background"
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', padding: 20 }}
        keyboardShouldPersistTaps="handled"
      >
        <View className="w-full max-w-[440px] self-center items-center">
          <View className="mb-10 items-center">
            <View className="w-16 h-16 bg-primary rounded-2xl items-center justify-center mb-6 shadow-xl rotate-3">
              <MaterialIcons name="architecture" size={32} color="#fff" />
            </View>
            <Text className="text-[28px] font-bold text-on-surface mb-2">Welcome back</Text>
            <Text className="text-on-surface-variant text-base">
              Enter your credentials to access your properties.
            </Text>
          </View>

          <View className="w-full bg-surface-container-lowest rounded-[20px] p-8 shadow-lg border border-outline-variant/20">
            <TextInput
              value={email}
              onChangeText={setEmail}
              placeholder="Email Address"
              placeholderTextColor="#44474f"
              keyboardType="email-address"
              autoCapitalize="none"
              className="w-full h-14 bg-surface-container-low rounded-full px-6 text-on-surface"
            />
            <View className="h-4" />
            <View className="relative">
              <TextInput
                value={password}
                onChangeText={setPassword}
                placeholder="Password"
                placeholderTextColor="#44474f"
                secureTextEntry={!showPassword}
                className="w-full h-14 bg-surface-container-low rounded-full px-6 pr-14 text-on-surface"
              />
              <TouchableOpacity
                onPress={() => setShowPassword(!showPassword)}
                className="absolute right-6 top-4"
              >
                <MaterialIcons name={showPassword ? 'visibility-off' : 'visibility'} size={20} color="#44474f" />
              </TouchableOpacity>
            </View>
            <View className="h-4" />
            <View className="items-end">
              <Link href="/(auth)/forgot-password" className="text-secondary font-semibold text-sm">
                Forgot Password?
              </Link>
            </View>

            {error ? (
              <Text className="text-error text-sm mt-3">{error}</Text>
            ) : null}

            <TouchableOpacity
              onPress={handleLogin}
              disabled={loading}
              className="w-full bg-primary py-4 rounded-full items-center mt-6 shadow-lg active:scale-[0.96]"
            >
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text className="text-on-primary text-sm font-semibold uppercase tracking-widest">
                  Log In
                </Text>
              )}
            </TouchableOpacity>

            <View className="my-8 flex-row items-center">
              <View className="flex-1 border-t border-outline-variant" />
              <Text className="px-4 text-xs text-on-surface-variant uppercase tracking-widest">
                Or connect with
              </Text>
              <View className="flex-1 border-t border-outline-variant" />
            </View>

            <View className="flex-row gap-4">
              <TouchableOpacity className="flex-1 flex-row items-center justify-center h-14 rounded-full border border-outline-variant">
                <MaterialIcons name="gps-fixed" size={20} color="#44474f" />
                <Text className="text-sm text-on-surface ml-2">Google</Text>
              </TouchableOpacity>
              <TouchableOpacity className="flex-1 flex-row items-center justify-center h-14 rounded-full border border-outline-variant">
                <MaterialIcons name="file-download" size={20} color="#44474f" />
                <Text className="text-sm text-on-surface ml-2">Apple</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View className="mt-10 flex-col items-center gap-4">
            <TouchableOpacity className="w-14 h-14 rounded-full bg-secondary-fixed items-center justify-center">
              <MaterialIcons name="fingerprint" size={28} color="#714800" />
            </TouchableOpacity>
            <Text className="text-xs text-on-surface-variant font-medium">
              Quick login with Face ID / Fingerprint
            </Text>
          </View>

          <View className="mt-10">
            <Text className="text-on-surface-variant text-base">
              Don{`'`}t have an account?{' '}
              <Link href="/(auth)/signup" className="text-secondary font-bold">
                Sign up
              </Link>
            </Text>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
