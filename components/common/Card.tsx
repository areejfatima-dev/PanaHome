import { View, Text } from 'react-native';

interface CardProps {
  title?: string;
  children?: React.ReactNode;
  className?: string;
}

export default function Card({ title, children, className = '' }: CardProps) {
  return (
    <View className={`bg-white rounded-[20px] p-4 mb-4 border border-surface-container-low shadow-sm ${className}`}>
      {title && <Text className="text-primary font-semibold text-lg mb-2">{title}</Text>}
      {children}
    </View>
  );
}
