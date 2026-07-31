import { View, ActivityIndicator, Text } from 'react-native';

interface LoaderProps {
  loading?: boolean;
  message?: string;
  overlay?: boolean;
}

export default function Loader({
  loading = true,
  message = 'Loading...',
  overlay = false,
}: LoaderProps) {
  if (!loading) return null;

  const content = (
    <View className="items-center justify-center">
      <ActivityIndicator size="large" color="#835400" />
      {message && <Text className="text-primary mt-2">{message}</Text>}
    </View>
  );

  if (overlay) {
    return (
      <View className="absolute inset-0 bg-black/50 items-center justify-center z-50">
        {content}
      </View>
    );
  }

  return content;
}