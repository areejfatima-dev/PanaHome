import { View, Text } from 'react-native';

interface AnalyticsChartProps {
  data: { label: string; value: number }[];
  title?: string;
}

export default function AnalyticsChart({ data, title }: AnalyticsChartProps) {
  const maxValue = Math.max(...data.map((d) => d.value), 1);

  return (
    <View className="bg-white rounded-[20px] border border-surface-container-low shadow-sm p-4 mb-4">
      {title && <Text className="text-primary font-semibold text-lg mb-3">{title}</Text>}
      {data.map((item, index) => (
        <View key={index} className="mb-3">
          <View className="flex-row items-center">
            <Text className="text-on-surface-variant w-20">{item.label}</Text>
            <View
              className="bg-secondary-container rounded-full"
              style={{
                width: `${(item.value / maxValue) * 100}%`,
                height: 20,
                minWidth: 4,
              }}
            />
            <Text className="text-primary ml-2 font-semibold">{item.value}</Text>
          </View>
        </View>
      ))}
    </View>
  );
}
