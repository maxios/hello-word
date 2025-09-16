import {ScrollView, YStack, XStack} from 'tamagui';
import Markdown from 'react-native-markdown-display';
import {useGetTextContentQuery} from '@/graphql/generated-queries';
import {useMemo} from 'react';
import {Dimensions} from 'react-native';
import {APP_PADDING} from '@/consts/consts';
import {readVideoThumbnailProperties} from '@/lib/image';
import {VideoPlayer} from '../VideoPlayer';
import {Text} from '../Text';

// Styles
const contentDefaultStyles = {
  body: {
    color: 'white',
    fontSize: 14,
    lineHeight: 22,
  },
};

const containerDefaultStyles = {
  padding: APP_PADDING,
  flexGrow: 1,
  marginBottom: 25,
  getBackgroundColor: '$surface0',
  height: '100%',
};

/**
 * TextContent component
 *
 * This component will be used to fetch the content from the database or CMS
 * and display it in a scrollable container.
 *
 * The content must be in markdown format
 *
 * @param uid - UID of the text content
 * @param contentStyle - Style of the content, font and color
 */
export const TextContent = ({
  uid,
  contentStyle = contentDefaultStyles,
  containerStyle = containerDefaultStyles,
}: {
  uid: string;
  containerStyle?: any;
  contentStyle?: any;
}) => {
  // Query content
  const {data} = useGetTextContentQuery({
    fetchPolicy: 'cache-and-network',
    variables: {
      uid,
    },
  });

  const textContent = data?.textContent;
  // TODO: check if the videoUrl is a valid url that contains a video
  const videoUrl = textContent?.video?.video?.mp4Url ?? textContent?.videoUrl;
  const thumbnail = textContent?.thumbnail;

  // Data mapping
  const content = useMemo(() => data?.textContent?.content, [data]);
  return (
    <YStack maxHeight="100%" gap={10} bc="$surface0">
      {videoUrl && (
        <XStack
          height={Dimensions.get('window').height / 4}
          marginVertical={10}
          maxHeight={300}
        >
          <VideoPlayer
            videoUrl={videoUrl ?? ''}
            {...readVideoThumbnailProperties(thumbnail, textContent?.video)}
            isMuted={false}
          />
        </XStack>
      )}
      <YStack mt={10} alignItems="center">
        {data?.textContent?.title && (
          <YStack>
            <Text variant="h5">{data.textContent.title}</Text>
          </YStack>
        )}

        {data?.textContent?.subtitle && (
          <YStack mt={10} als="center">
            <Text color="brandLight" variant="bodyM">
              {data?.textContent?.subtitle}
            </Text>
          </YStack>
        )}
      </YStack>
      <ScrollView showsVerticalScrollIndicator={false} style={containerStyle}>
        {/* Loading state */}
        {content && <Markdown style={contentStyle}>{content}</Markdown>}
      </ScrollView>
    </YStack>
  );
};
