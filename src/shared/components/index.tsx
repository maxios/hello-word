import * as ButtonPlayground from "./Button/Button.playground";
import * as PromoCardPlayground from "./PromoCard/PromoCard.playground";
import * as CarouselPlayground from "./carousel/Carousel.playground";
import * as FieldsPlayground from "./fields/Fields.playground";

export * from "./Button/Button";
export * from "./fields";

export const playground = {
  carousel: CarouselPlayground,
  buttons: ButtonPlayground,
  promoCard: PromoCardPlayground,
  // Individual field playgrounds
  ...FieldsPlayground.playgrounds,
};
