import { View, Text } from 'react-native';

interface AnalyticsChartProps {
  data: { label: string; value: number }[];
  title?: string;
}

export default function AnalyticsChart({ data, title }: AnalyticsChartProps) {
  const maxValue = Math.max(...data.map((d) => d.value), 1);

  return (
    <View className="bg-card rounded-lg p-4 mb-4">
      {title && <Text className="text-white font-semibold text-lg mb-3">{title}</Text>}
      {data.map((item, index) => (
        <View key={index} className="mb-3">
          <View className="flex-row items-center">
            <Text className="text-gray-400 w-20">{item.label}</Text>
            <View
              className="bg-gold rounded-lg"
              style={{
                width: `${(item.value / maxValue) * 100}%`,
                height: 20,
                minWidth: 4,
              }}
            />
            <Text className="text-white ml-2">{item.value}</Text>
          </View>
        </View>
      ))}
    </View>
  );
}