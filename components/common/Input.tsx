import { View, TextInput, Text } from 'react-native';

interface InputProps {
  placeholder?: string;
  value?: string;
  onChangeText?: (text: string) => void;
  secureTextEntry?: boolean;
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
  error?: string;
  className?: string;
}

export default function Input({
  placeholder,
  value,
  onChangeText,
  secureTextEntry = false,
  keyboardType = 'default',
  error,
  className = '',
}: InputProps) {
  return (
    <View className={`mb-4 ${className}`}>
      <TextInput
        placeholder={placeholder}
        placeholderTextColor="#888"
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        className="bg-card text-white p-4 rounded-lg"
      />
      {error && <Text className="text-danger text-sm mt-1">{error}</Text>}
    </View>
  );
}