import {XStack, YStack} from 'tamagui';
import {Text} from './Text';
import {ConcreteSvg} from './svgs';
import tokens from '../theme/tokens';
import {APP_PADDING} from '../consts/consts';

export interface HeaderProps {
  heading: string;
  subtext?: string | React.ReactNode;
  variant?: 'primary' | 'secondary';
  // TODO: Header should't have its own padding
  px?: number;
  pb?: number;
  pt?: number;
}

export const Header = ({
  heading,
  subtext,
  variant = 'primary',
  px,
  pb,
  pt,
}: HeaderProps) => {
  const isPrimary = variant === 'primary';

  const headingRender = (
    <Text
      variant={isPrimary ? 'h1' : 'h3'}
      withWhiteBackground={isPrimary}
      color={isPrimary ? 'surface0' : 'textHighEmphasis'}
    >
      {heading}
    </Text>
  );

  const subtextRender =
    typeof subtext === 'string' ? (
      <Text color="textMediumEmphasis">{subtext}</Text>
    ) : (
      subtext
    );

  return (
    <YStack
      width="100%"
      backgroundColor={isPrimary ? '$surface8' : '$surface0'}
    >
      <YStack bc="$surface0" pb={pb ?? 0}>
        <YStack>
          {isPrimary ? (
            <>
              <YStack
                gap={12}
                mb={-50}
                px={px ?? APP_PADDING}
                pt={pt ?? 38}
                zIndex={1}
                backgroundColor="$surface8"
              >
                {headingRender}
                {subtextRender}
              </YStack>
              <XStack zIndex={0}>
                {isPrimary && <ConcreteSvg color={tokens.color.surface8.val} />}
              </XStack>
            </>
          ) : (
            <YStack gap={12} px={px ?? APP_PADDING} py={38}>
              {headingRender}
              {subtextRender}
            </YStack>
          )}
        </YStack>
      </YStack>
    </YStack>
  );
};
