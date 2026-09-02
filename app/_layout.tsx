import '../global.css';
import { useEffect } from 'react';
import { Stack, ThemeProvider, DefaultTheme } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { View, Platform } from 'react-native';
import 'react-native-reanimated';
import { SettingsProvider } from '@/contexts/SettingsContext';
import { getCurrentUser, onAuthStateChange } from '@/services/authService';
import { useAuthStore } from '@/store/authStore';

export default function RootLayout() {
  const setUser = useAuthStore((state) => state.setUser);

  useEffect(() => {
    getCurrentUser().then(setUser);

    const { data } = onAuthStateChange((user) => setUser(user));
    return () => data?.subscription?.unsubscribe();
  }, [setUser]);

  return (
    <SettingsProvider>
      <ThemeProvider value={DefaultTheme}>
        <View
          style={{
            flex: 1,
            width: '100%',
            maxWidth: Platform.OS === 'web' ? 430 : undefined,
            alignSelf: Platform.OS === 'web' ? 'center' : undefined,
            backgroundColor: '#f7f9fc',
          }}
        >
          <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" />
          <Stack.Screen name="role-select" />
          <Stack.Screen name="(auth)/login" />
          <Stack.Screen name="(auth)/signup" />
          <Stack.Screen name="(auth)/forgot-password" />
          <Stack.Screen name="(buyer)/home" />
          <Stack.Screen name="(buyer)/favorites" />
          <Stack.Screen name="(buyer)/history" />
          <Stack.Screen name="(buyer)/schedule-appointment" />
          <Stack.Screen name="(buyer)/complaint-centre" />
          <Stack.Screen name="(buyer)/ar-walkthrough" />
          <Stack.Screen name="(buyer)/ar-furniture-placement" />
          <Stack.Screen name="(buyer)/property-details" />
          <Stack.Screen name="(buyer)/profile" />
          <Stack.Screen name="(buyer)/ai-assistant" />
          <Stack.Screen name="(seller)/dashboard" />
          <Stack.Screen name="(seller)/edit-property" />
          <Stack.Screen name="(seller)/analytics" />
          <Stack.Screen name="(seller)/availability-settings" />
          <Stack.Screen name="(seller)/profile" />
          <Stack.Screen name="(seller)/ar-capture" />
          <Stack.Screen name="(seller)/capture-checklist" />
          <Stack.Screen name="(seller)/add-property/step-1-basic" />
          <Stack.Screen name="(seller)/add-property/step-2-rooms" />
          <Stack.Screen name="(seller)/add-property/step-3-capture" />
          <Stack.Screen name="(seller)/add-property/step-4-location" />
          <Stack.Screen name="(seller)/add-property/step-5-review" />
          <Stack.Screen name="(admin)/dashboard" />
          <Stack.Screen name="(admin)/property-approvals" />
          <Stack.Screen name="(admin)/user-management" />
          <Stack.Screen name="(admin)/complaint-management" />
          <Stack.Screen name="(admin)/profile" />
        </Stack>
        <StatusBar style="dark" />
        </View>
      </ThemeProvider>
    </SettingsProvider>
  );
}