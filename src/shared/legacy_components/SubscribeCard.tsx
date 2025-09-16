import {View, YStack} from 'tamagui';
import {PromoCard} from '../pages/MoveTab/MovePage/PromoCard';
import lisaCard from '../assets/images/onboarding/lisa-card.png';
import {ExploreSubscriptionButton} from './carousels/exploreSubscriptionButton';
import {Button} from './Button';

export const SubscribeCard = () => {
  return (
    <YStack gap={16}>
      <PromoCard
        isTextHighlighted
        heading="SUBSCRIBE"
        subHeading="UNLOCK ALL CONTENT"
        href="/payment/options"
        image={lisaCard}
        subtext="Get a training plan based on your specific needs and goals, along with exclusive content from Lisa and Romane."
      />
      <View px={16}>
        <Button {...ExploreSubscriptionButton()} />
      </View>
    </YStack>
  );
};
