import * as ButtonPlayground from "./Button/Button.playground";
import * as CarouselPlayground from "./carousel/Carousel.playground";
import * as FieldsPlayground from "./fields/Fields.playground";

export * from "./Button/Button";
export * from "./fields";

export const playground = {
  carousel: CarouselPlayground,
  buttons: ButtonPlayground,
  // Individual field playgrounds
  ...FieldsPlayground.playgrounds,
};
