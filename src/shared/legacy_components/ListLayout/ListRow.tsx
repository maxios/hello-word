import {View, XStack, YStack} from 'tamagui';
import {Text} from '@/components/Text';
import {useCallback, useMemo} from 'react';
import tokens from '@/theme/tokens';
import {ChevronRightIcon} from '../icons';

interface ListRowProps {
  title: string;
  subtitle: string;
  indicator: string;
}

export const ListRowBaseUI = ({
  leftSection,
  rightSection,
  ...props
}: {
  leftSection: React.ReactNode;
  rightSection: React.ReactNode;
  [key: string]: any;
}) => {
  return (
    <XStack
      jc="space-between"
      ai="center"
      px={16}
      py={8}
      bg="$surface8"
      w="100%"
      {...props}
    >
      {leftSection}
      {rightSection}
    </XStack>
  );
};

export const ListRowClickableUI = ({
  leftSection,
  rightSection,
}: {
  leftSection: React.ReactNode;
  rightSection: React.ReactNode;
}) => {
  const rightSectionWithIcon = useMemo(() => {
    return (
      <XStack gap={8} ai="center" jc="flex-end">
        {rightSection}
        <ChevronRightIcon color={tokens.color.brandMid.val} />
      </XStack>
    );
  }, [rightSection]);

  return (
    <ListRowBaseUI
      leftSection={leftSection}
      rightSection={rightSectionWithIcon}
    />
  );
};
/**
 * This component is mostly used with FlatList
 *
 * It's a row with a title, subtitle and indicator at the end
 */
export const ListRowTextUI = ({title, subtitle, indicator}: ListRowProps) => {
  const RightSection = useCallback(() => {
    return (
      <XStack gap={8} ai="center" flex={1} w="100%" jc="flex-end">
        <Text variant="bodySEmphasis" color="textHighEmphasis">
          {indicator}
        </Text>
      </XStack>
    );
  }, [indicator]);

  const LeftSection = useCallback(() => {
    return (
      <View flex={3}>
        <YStack gap={8} flexWrap="wrap">
          {/* Title */}
          <XStack flex={1}>
            <Text
              variant="bodySEmphasis"
              color="textHighEmphasis"
              noWrap={false}
            >
              {title}
            </Text>
          </XStack>

          {/* Subtitle */}
          {subtitle && (
            <Text variant="bodyS" color="textLowEmphasis" noWrap={false}>
              {subtitle}
            </Text>
          )}
        </YStack>
      </View>
    );
  }, [subtitle, title]);

  return (
    <ListRowBaseUI
      leftSection={<LeftSection />}
      rightSection={<RightSection />}
    />
  );
};
