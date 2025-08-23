import { View } from 'react-native';
import { CheckIcon, ChevronLeftIcon, ChevronRightIcon } from '../icons';
import { Button } from './Button';

export function ButtonDemo() {
  return (
    <View className="space-y-4 p-4">
      {/* Primary Button (Cyan/Brand) */}
      <Button variant="primary">
        Start Free Trial
      </Button>

      {/* Secondary Button (Dark Gray) */}
      <Button variant="secondary">
        Continue
      </Button>

      {/* Outlined/Ghost Button */}
      <Button variant="outlined">
        View Details
      </Button>

      {/* Text-Only Button */}
      <Button variant="text">
        Skip
      </Button>

      {/* Navigation Buttons */}
      <View className="flex-row justify-between">
        <Button 
          variant="navigation" 
          leftIcon={<ChevronLeftIcon size="sm" color="#FFFFFF" />}
        >
          Back
        </Button>
        <Button 
          variant="navigation"
          rightIcon={<ChevronRightIcon size="sm" color="#FFFFFF" />}
        >
          Next
        </Button>
      </View>

      {/* Floating Action Button */}
      <Button 
        variant="fab"
        className="self-end"
        leftIcon={<CheckIcon size="md" color="#FFFFFF" />}
      >
        Complete
      </Button>

      {/* Loading State Example */}
      <Button variant="primary" isLoading>
        Loading...
      </Button>

      {/* Disabled State Example */}
      <Button variant="primary" disabled>
        Disabled Button
      </Button>
    </View>
  );
}
