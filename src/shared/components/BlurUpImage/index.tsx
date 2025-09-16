import {
  Image,
  ImageBackground,
  ImageBackgroundProps,
  ImageProps,
} from "expo-image";

/**
 * A component that renders an image with a blur-up effect. Image's are stored
 * using the src as the key in the cache, we can therefore use this to
 * automatically retrieve the cached image and the base64 version of the image.
 */
export const BlurUpImage: React.FC<ImageProps> = (props) => {
  const { source, placeholder, ...rest } = props;
  return (
    <Image
      {...rest}
      transition={{ effect: "cross-dissolve", duration: 500 }}
      source={source}
      placeholderContentFit="cover"
      contentFit="cover"
      placeholder={placeholder}
    />
  );
};

export const BlurUpImageBackground: React.FC<ImageBackgroundProps> = (
  props,
) => {
  const { source, placeholder, ...rest } = props;
  return (
    <ImageBackground
      {...rest}
      transition={{ effect: "cross-dissolve", duration: 500 }}
      source={source}
      placeholderContentFit="cover"
      contentFit="cover"
      placeholder={placeholder}
    />
  );
};
