import {XStack, YStack} from 'tamagui';
import {BaseProductCard, BaseProductCardProps} from '../BaseProductCard';
import {Text} from '../../../Text';

interface GuideChips {
  guideType: string;
  numWeeks: number;
  workoutsPerWeek: number;
}

export const GuideChips = ({
  guideType,
  numWeeks,
  workoutsPerWeek,
}: GuideChips) => {
  return (
    <XStack gap={4} ai="flex-end">
      <Text variant="uiS" withBrandLightBackground>
        {guideType}
      </Text>
      <Text variant="uiS" withBrandMidBackground>
        {`${numWeeks} weeks`}
      </Text>
      <Text variant="uiS" withBrandMidBackground>
        {`${workoutsPerWeek}X Per Week`}
      </Text>
    </XStack>
  );
};

export interface GuideProductCardProps
  extends Omit<BaseProductCardProps, 'aboveName' | 'topRight'> {
  guideType: string;
  numWeeks: number;
  workoutsPerWeek: number;
  cardTopRightOverride?: React.ReactNode;
  price?: string;
}

export const GuideProductCard = (props: GuideProductCardProps) => {
  return (
    <BaseProductCard
      {...props}
      topRight={props.cardTopRightOverride}
      aboveName={
        <YStack space={12}>
          {props.price ? (
            <Text variant="h5" withBrandLightBackground>
              {props.price}
            </Text>
          ) : null}
          <GuideChips
            guideType={props.guideType}
            numWeeks={props.numWeeks}
            workoutsPerWeek={props.workoutsPerWeek}
          />
        </YStack>
      }
    />
  );
};
