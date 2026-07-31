import { TouchableOpacity, Text } from 'react-native';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary';
  disabled?: boolean;
  className?: string;
}

export default function Button({
  title,
  onPress,
  variant = 'primary',
  disabled = false,
  className = '',
}: ButtonProps) {
  const baseClasses = 'py-3.5 px-6 rounded-full items-center justify-center';
  const variantClasses =
    variant === 'primary' ? 'bg-primary' : 'bg-white border-2 border-primary';
  const textClasses =
    variant === 'primary' ? 'text-on-primary font-semibold' : 'text-primary font-semibold';
  const disabledClasses = disabled ? 'opacity-50' : '';

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      className={`${baseClasses} ${variantClasses} ${disabledClasses} ${className}`}
    >
      <Text className={textClasses}>{title}</Text>
    </TouchableOpacity>
  );
}
