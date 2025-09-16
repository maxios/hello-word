import {XStack} from 'tamagui';
import dayjs from 'dayjs';
import {BaseProductCard, BaseProductCardProps} from '../BaseProductCard';
import {Text} from '../../../Text';
import {ProgressEntryProductCardFragment} from '../../../../graphql/generated-queries';
import {useUserUnits} from '../../../../lib/units';

export interface ProgressProductCardProps {
  product: ProgressEntryProductCardFragment;
  isSingleCard?: BaseProductCardProps['isSingleCard'];
  isGridCard?: BaseProductCardProps['isGridCard'];
}

export const ProgressProductCard = (props: ProgressProductCardProps) => {
  const {id, date, weight, displayImage} = props.product;
  const {convert} = useUserUnits();

  return (
    <BaseProductCard
      name={convert(Number(weight), 'kg')}
      imageUrl={displayImage}
      href={{pathname: '/settings/progress-entry', params: {id}}}
      isSingleCard={props.isSingleCard}
      isGridCard={props.isGridCard}
      aboveName={
        <XStack>
          <Text variant="uiS" withBrandMidBackground>
            {dayjs(date).format('DD MMM YYYY')}
          </Text>
        </XStack>
      }
    />
  );
};
