import { View, Text } from 'react-native';

interface CardProps {
  title?: string;
  children?: React.ReactNode;
  className?: string;
}

export default function Card({ title, children, className = '' }: CardProps) {
  return (
    <View className={`bg-card rounded-lg p-4 mb-4 ${className}`}>
      {title && <Text className="text-white font-semibold text-lg mb-2">{title}</Text>}
      {children}
    </View>
  );
}