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
import { Link } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { resetPassword } from '@/services/authService';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleReset = async () => {
    setError('');
    if (!email || !email.includes('@')) {
      setError('Please enter a valid email address.');
      return;
    }
    setLoading(true);
    try {
      await resetPassword(email);
      setSent(true);
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
        <View className="w-full max-w-md self-center items-center">
          <View className="items-center mb-10">
            <View className="w-24 h-24 bg-surface-container-lowest rounded-full items-center justify-center mb-6 shadow-lg">
              <MaterialIcons name="lock" size={48} color="#835400" />
            </View>
            <Text className="text-[28px] font-bold text-primary mb-2">Reset your password</Text>
            <Text className="text-on-surface-variant text-base text-center max-w-[280px]">
              Enter the email address associated with your account.
            </Text>
          </View>

          {!sent ? (
            <View className="w-full">
              <View className="relative mb-6">
                <TextInput
                  value={email}
                  onChangeText={setEmail}
                  placeholder="Email Address"
                  placeholderTextColor="#747780"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  className="w-full py-4 px-6 bg-white border-2 border-surface-container-highest rounded-full text-on-surface"
                />
                <MaterialIcons name="mail" size={20} color="#747780" style={{ position: 'absolute', right: 24, top: 18 }} />
              </View>
              {error ? <Text className="text-error text-sm mb-4">{error}</Text> : null}
              <TouchableOpacity
                onPress={handleReset}
                disabled={loading}
                className="w-full py-4 bg-primary rounded-full items-center shadow-lg active:scale-[0.96]"
              >
                {loading ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text className="text-on-primary text-sm font-semibold">Send Reset Link</Text>
                )}
              </TouchableOpacity>
            </View>
          ) : (
            <View className="w-full items-center">
              <View className="w-32 h-32 bg-surface-container-lowest rounded-[20px] shadow-xl items-center justify-center mb-8">
                <MaterialIcons name="mark-email-read" size={64} color="#835400" />
              </View>
              <Text className="text-[28px] font-bold text-primary mb-2 text-center">Check your email</Text>
              <Text className="text-on-surface-variant text-base text-center px-4 mb-8">
                We{`'`}ve sent a password reset link to your inbox. Please check your spam folder if
                you don{`'`}t see it.
              </Text>
              <Link
                href="/(auth)/login"
                className="w-full py-4 border-2 border-primary rounded-full items-center flex-row justify-center"
              >
                <MaterialIcons name="login" size={18} color="#03224d" style={{ marginRight: 8 }} />
                <Text className="text-primary text-sm font-semibold">Back to Login</Text>
              </Link>
              <TouchableOpacity onPress={handleReset} className="mt-6">
                <Text className="text-secondary text-sm font-semibold">
                  Didn{`'`}t receive email? Resend link
                </Text>
              </TouchableOpacity>
            </View>
          )}

          <Text className="text-xs text-outline mt-16">SECURE AUTHENTICATION • POWERED BY AI</Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
