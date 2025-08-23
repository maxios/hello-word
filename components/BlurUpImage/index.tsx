import { gql, useApolloClient } from "@apollo/client";
import {
  Image,
  ImageBackground,
  ImageBackgroundProps,
  ImageProps,
} from "expo-image";
import { useMemo } from "react";

const useCachedPlaceholder = (source: ImageProps["source"]) => {
  const apollo = useApolloClient();

  return useMemo(() => {
    let url;
    if (typeof source === "string") {
      url = source;
    } else if (
      source &&
      typeof source === "object" &&
      "uri" in source &&
      typeof source?.uri === "string"
    ) {
      url = source.uri;
    }

    if (url) {
      const frag = apollo.readFragment({
        fragment: gql`
          fragment ResponsiveImage on ResponsiveImage {
            src
            base64
          }
        `,
        // Should match key used in cache in apollo.ts
        id: `ResponsiveImage:${url}`,
      });

      if (frag?.base64) {
        return frag.base64;
      }
    }

    return undefined;
  }, [source, apollo]);
};

/**
 * A component that renders an image with a blur-up effect. Image's are stored
 * using the src as the key in the cache, we can therefore use this to
 * automatically retrieve the cached image and the base64 version of the image.
 */
export const BlurUpImage: React.FC<ImageProps> = (props) => {
  const { source, placeholder, ...rest } = props;
  const base64 = useCachedPlaceholder(source) ?? placeholder;
  return (
    <Image
      {...rest}
      transition={{ effect: "cross-dissolve", duration: 500 }}
      source={source}
      placeholderContentFit="cover"
      contentFit="cover"
      placeholder={base64 ? { uri: base64 } : undefined}
    />
  );
};

export const BlurUpImageBackground: React.FC<ImageBackgroundProps> = (
  props,
) => {
  const { source, placeholder, ...rest } = props;
  // const base64 = useCachedPlaceholder(source) ?? placeholder;
  return (
    <ImageBackground
      {...rest}
      transition={{ effect: "cross-dissolve", duration: 500 }}
      source={source}
      placeholderContentFit="cover"
      contentFit="cover"
      // placeholder={base64 ? { uri: base64 } : undefined}
    />
  );
};
