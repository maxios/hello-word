import {XStack, YStack, View} from 'tamagui';
import {UpwardTrendIcon} from './icons';
import {Text} from './Text';
import {ButtonProps} from './Button/types';
import {Button} from './Button';

export const Message = ({
  message,
  icon,
  button,
}: {
  message: string;
  icon: React.ReactNode;
  button?: ButtonProps;
}) => {
  return (
    <View>
      <XStack
        pt={16}
        pb={12}
        px={24}
        gap={14}
        borderColor="$brandMid"
        borderLeftWidth={2}
        backgroundColor="$surface8"
        borderTopRightRadius={4}
        borderBottomRightRadius={4}
      >
        <View mt={4}>{icon || <UpwardTrendIcon />}</View>
        <YStack flex={1} ai="flex-start">
          <Text color="textMediumEmphasis">{message}</Text>
          {!!button && (
            <View ml={-32}>
              <Button variant="text" {...button} />
            </View>
          )}
        </YStack>
      </XStack>
    </View>
  );
};
