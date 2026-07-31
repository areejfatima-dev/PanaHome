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
import { signUp } from '@/services/authService';
import { useAuthStore } from '@/store/authStore';

export default function Signup() {
  const router = useRouter();
  const { setUser } = useAuthStore();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [agree, setAgree] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    setError('');
    if (!fullName || !email || !phone || !password) {
      setError('Please fill in all fields.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    if (!agree) {
      setError('Please agree to the Terms of Service and Privacy Policy.');
      return;
    }
    setLoading(true);
    try {
      const user = await signUp(email, password, fullName);
      setUser(user);
      router.replace('/(buyer)/home');
    } catch (e: any) {
      setError(e?.message || 'Something went wrong. Please try again.');
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
        <View className="w-full max-w-[480px] self-center bg-surface-container-lowest rounded-[20px] p-8 shadow-lg border border-outline-variant/30 overflow-hidden">
          <View className="mb-8">
            <TouchableOpacity onPress={() => router.back()} className="w-10 h-10 items-center justify-center rounded-full bg-surface-container-low mb-6">
              <MaterialIcons name="arrow-back" size={22} color="#191c1e" />
            </TouchableOpacity>
            <Text className="text-[28px] font-bold text-primary mb-2">Create your account</Text>
            <Text className="text-on-surface-variant text-base">
              Join our exclusive real estate network today.
            </Text>
          </View>

          <TextInput
            value={fullName}
            onChangeText={setFullName}
            placeholder="Full Name"
            placeholderTextColor="#44474f"
            className="w-full px-6 py-4 rounded-full bg-surface-container-low text-on-surface mb-4"
          />
          <TextInput
            value={email}
            onChangeText={setEmail}
            placeholder="Email Address"
            placeholderTextColor="#44474f"
            keyboardType="email-address"
            autoCapitalize="none"
            className="w-full px-6 py-4 rounded-full bg-surface-container-low text-on-surface mb-4"
          />
          <TextInput
            value={phone}
            onChangeText={setPhone}
            placeholder="Phone Number"
            placeholderTextColor="#44474f"
            keyboardType="phone-pad"
            className="w-full px-6 py-4 rounded-full bg-surface-container-low text-on-surface mb-4"
          />
          <View className="relative mb-2">
            <TextInput
              value={password}
              onChangeText={setPassword}
              placeholder="Password"
              placeholderTextColor="#44474f"
              secureTextEntry={!showPassword}
              className="w-full px-6 py-4 pr-14 rounded-full bg-surface-container-low text-on-surface"
            />
            <TouchableOpacity
              onPress={() => setShowPassword(!showPassword)}
              className="absolute right-6 top-4"
            >
              <MaterialIcons name={showPassword ? 'visibility-off' : 'visibility'} size={20} color="#44474f" />
            </TouchableOpacity>
          </View>
          <View className="px-2 flex-row gap-1 mb-1">
            <View className="flex-1 h-1 bg-secondary rounded-full" />
            <View className="flex-1 h-1 bg-secondary rounded-full" />
            <View className="flex-1 h-1 bg-outline-variant rounded-full" />
            <View className="flex-1 h-1 bg-outline-variant rounded-full" />
          </View>
          <Text className="text-[10px] text-on-surface-variant uppercase tracking-wider font-bold px-2 mb-4">
            Strong Password
          </Text>
          <View className="relative mb-4">
            <TextInput
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              placeholder="Confirm Password"
              placeholderTextColor="#44474f"
              secureTextEntry={!showConfirm}
              className="w-full px-6 py-4 pr-14 rounded-full bg-surface-container-low text-on-surface"
            />
            <TouchableOpacity
              onPress={() => setShowConfirm(!showConfirm)}
              className="absolute right-6 top-4"
            >
              <MaterialIcons name={showConfirm ? 'visibility-off' : 'visibility'} size={20} color="#44474f" />
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            onPress={() => setAgree(!agree)}
            className="flex-row items-start gap-3 px-2 mb-6"
          >
            <View className={`w-5 h-5 rounded border-2 items-center justify-center ${agree ? 'bg-secondary border-secondary' : 'border-outline-variant'}`}>
              {agree ? <MaterialIcons name="check" size={14} color="#fff" /> : null}
            </View>
            <Text className="text-sm text-on-surface-variant leading-tight flex-1">
              I agree to the <Text className="text-secondary font-bold">Terms of Service</Text> and{' '}
              <Text className="text-secondary font-bold">Privacy Policy</Text>.
            </Text>
          </TouchableOpacity>

          {error ? <Text className="text-error text-sm mb-4 px-2">{error}</Text> : null}

          <TouchableOpacity
            onPress={handleSignup}
            disabled={loading}
            className="w-full bg-primary py-5 rounded-full items-center shadow-lg active:scale-[0.96]"
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text className="text-on-primary text-sm font-semibold">Create Account</Text>
            )}
          </TouchableOpacity>

          <View className="flex-row items-center my-8">
            <View className="flex-1 border-t border-outline-variant/30" />
            <Text className="px-4 text-xs text-on-surface-variant uppercase tracking-widest">
              or sign up with
            </Text>
            <View className="flex-1 border-t border-outline-variant/30" />
          </View>

          <View className="flex-row gap-4">
            <TouchableOpacity className="flex-1 flex-row items-center justify-center gap-3 py-4 border-2 border-outline-variant rounded-full">
              <MaterialIcons name="gps-fixed" size={20} color="#44474f" />
              <Text className="text-sm">Google</Text>
            </TouchableOpacity>
            <TouchableOpacity className="flex-1 flex-row items-center justify-center gap-3 py-4 border-2 border-outline-variant rounded-full">
              <MaterialIcons name="file-download" size={20} color="#44474f" />
              <Text className="text-sm">Apple</Text>
            </TouchableOpacity>
          </View>

          <View className="mt-8 text-center">
            <Text className="text-on-surface-variant text-base">
              Already have an account?{' '}
              <Link href="/(auth)/login" className="text-secondary font-bold">
                Log in
              </Link>
            </Text>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
