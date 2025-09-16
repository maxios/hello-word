import {useCountUp} from 'use-count-up';
import {View, XStack, YStack} from 'tamagui';
import {useMemo} from 'react';
import {APP_PADDING, DEVICE_WIDTH} from '../consts/consts';
import {DoughnutChart} from './DoughnutChart';
import tokens from '../theme/tokens';
import {Text} from './Text';
import {TextProps} from './Text/types';
import {Button} from './Button';
import {MacronutrientBreakdown} from '../graphql/generated-queries';
import {RoughEdgeTop} from './RoughEdge/top';
import {RoughEdgeBottom} from './RoughEdge/bottom';

/**
 * The Macros idneitites
 */
interface MacrosType {
  label: string;
  unitLabel: 'g' | 'kcal';
  style: {
    backgroundColor: TextProps['backgroundColor'];
    color: TextProps['color'];
  };
}
// Available Macros to be showed in tags
export type MacroNames = 'protein' | 'carbs' | 'fat' | 'kcal';
export const MACROS: Record<MacroNames, MacrosType> = {
  protein: {
    label: 'Protein',
    unitLabel: 'g',
    style: {
      backgroundColor: 'brandDark',
      color: 'brandLight',
    },
  },
  carbs: {
    label: 'Carbs',
    unitLabel: 'g',
    style: {
      backgroundColor: 'brandLight',
      color: 'brandDark',
    },
  },
  fat: {
    label: 'Fat',
    unitLabel: 'g',
    style: {
      backgroundColor: 'brandMid',
      color: 'brandDarkest',
    },
  },
  kcal: {
    label: 'Calories',
    unitLabel: 'kcal',
    style: {
      backgroundColor: 'surface12',
      color: 'textHighEmphasis',
    },
  },
};

// The tag for one Macro
export const MacroTag = (props: {name: MacroNames}) => {
  return (
    <Text
      variant="uiS"
      color={MACROS[props.name].style.color}
      backgroundColor={MACROS[props.name].style.backgroundColor}
    >
      {MACROS[props.name].label}
    </Text>
  );
};

interface MacroValueProps extends Partial<TextProps> {
  value: number;
  name: MacroNames;
  props?: TextProps;
  hasUnit?: boolean;
}
// The Value in grams for one Macro
export const MacroValue = ({
  value,
  name,
  hasUnit = true,
  ...props
}: MacroValueProps) => {
  const {unitLabel} = MACROS[name];
  const {value: animatedValue} = useCountUp({
    isCounting: true,
    start: 0,
    end: Number(value.toFixed(0)),
    duration: 3.2,
  });
  const textContent = useMemo(() => {
    return animatedValue + (hasUnit ? unitLabel : '');
  }, [animatedValue, hasUnit, unitLabel]);

  return (
    <Text
      variant="h3"
      color="surface0"
      backgroundColor="textHighEmphasis"
      {...props}
    >
      {textContent}
    </Text>
  );
};

// This is used in home screen to display the macros vertically
const MacroLabelValue: React.FC<{
  name: MacroNames;
  percentage: number;
  value: number;
}> = (props) => {
  return (
    <YStack gap={8}>
      <XStack gap={8} alignItems="center">
        {/* Tag */}
        <MacroTag name={props.name} />

        {/* --- Decoration Bar --- */}
        <View h={8} w={1} bc="$brandLight" />

        {/* Percentage */}
        <Text variant="uiS">{`${props.percentage}%`}</Text>
      </XStack>

      {/* Value */}
      <MacroValue value={props.value} name={props.name} />
    </YStack>
  );
};

/**
 * Display the Macro Nutrient Labels Vertically
 */
interface MacroLabelsProps {
  macronutrientBreakdown: MacronutrientBreakdown;
}
export const MacroLabels = (props: MacroLabelsProps) => {
  return (
    <YStack gap={24}>
      <MacroLabelValue
        name="protein"
        percentage={30}
        value={props.macronutrientBreakdown.protein}
      />
      <MacroLabelValue
        name="carbs"
        percentage={35}
        value={props.macronutrientBreakdown.carbs}
      />
      <MacroLabelValue
        name="fat"
        percentage={35}
        value={props.macronutrientBreakdown.fat}
      />
    </YStack>
  );
};

const MacrosDisplay: React.FC<{
  macronutrientBreakdown: MacronutrientBreakdown;
  home?: boolean;
}> = (props) => {
  return (
    <View>
      <YStack gap={8} px={APP_PADDING} pb={16}>
        <Text variant="h5">Suggested Macros</Text>
        <Text color="textMediumEmphasis">
          We&apos;ve estimated these macros based on your goals, activity level,
          and biology. Use these as a guide, and always listen to your body
          first.
        </Text>
      </YStack>
      <RoughEdgeTop />
      <XStack gap={24} bc="$surface8" py={30} px={16}>
        <MacroLabels macronutrientBreakdown={props.macronutrientBreakdown} />
        <DoughnutChart
          size={DEVICE_WIDTH * 0.55}
          centerColor={tokens.color.surface8.val}
          series={[
            {color: tokens.color.brandDark.val, value: 40},
            {color: tokens.color.brandMid.val, value: 30},
            {color: tokens.color.brandLight.val, value: 30},
          ]}
        >
          <View flex={1} alignItems="center" justifyContent="center">
            <YStack gap={8} alignItems="center">
              <Text variant="h4">
                {`${props.macronutrientBreakdown.kcal.toFixed(0)} KCAL`}
              </Text>
              <Text variant="uiS">
                {/* eslint-disable-next-line no-nested-ternary */}
                {props.macronutrientBreakdown.deficit === 0
                  ? ''
                  : props.macronutrientBreakdown.deficit < 0
                    ? `Deficit of ${(
                        props.macronutrientBreakdown.deficit * -1
                      ).toFixed(0)}`
                    : `Surplus of ${props.macronutrientBreakdown.deficit.toFixed(
                        0,
                      )}`}
              </Text>
            </YStack>
          </View>
        </DoughnutChart>
      </XStack>
      {!props.home && (
        <>
          <RoughEdgeBottom />

          <View px={APP_PADDING}>
            <Button variant="secondary" label="Learn more" href="/macros" />
            {/* <YStack mt={8}>
              <Button
                variant="secondary"
                label="View Sources"
                href="/settings/sources"
              />
            </YStack> */}
          </View>
        </>
      )}
    </View>
  );
};

export {MacrosDisplay};
