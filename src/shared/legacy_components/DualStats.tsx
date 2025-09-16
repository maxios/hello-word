import {YStack, XStack} from 'tamagui';
import {Text} from './Text';

interface Stat {
  label: string;
  value: string | number;
}

interface DualStatsProps {
  header: string;
  icon?: React.ReactNode;
  stats: Stat[];
}

export const DualStats = ({header, icon, stats}: DualStatsProps) => {
  return (
    <YStack width="100%" gap={8}>
      <XStack gap={4} alignItems="center">
        <Text variant="h4">{header}</Text>
        {!!icon && icon}
      </XStack>
      <XStack width="100%" bc="$surface8" py={8}>
        {stats.map(({label, value}, idx) => (
          <YStack
            key={label}
            flex={1}
            borderColor="$brandMid"
            borderLeftWidth={idx === 0 ? 0 : 1}
            py={12}
            px={16}
            bc="$surface8"
          >
            <Text variant="h5">{value?.toString()}</Text>
            <Text color="textMediumEmphasis">{label}</Text>
          </YStack>
        ))}
      </XStack>
    </YStack>
  );
};
