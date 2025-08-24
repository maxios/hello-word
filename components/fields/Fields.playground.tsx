import { useForm } from "react-hook-form";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import {
  CheckboxField,
  DateField,
  EmailField,
  FileField,
  NumberField,
  PasswordField,
  PhoneField,
  RadioField,
  SearchField,
  SelectField,
  SliderField,
  SwitchField,
  TextAreaField,
  TextField,
} from "./index";

// Import individual playgrounds
import * as CheckboxFieldPlayground from "./CheckboxField.playground";
import * as EmailFieldPlayground from "./EmailField.playground";
import * as PasswordFieldPlayground from "./PasswordField.playground";
import * as RadioFieldPlayground from "./RadioField.playground";
import * as SelectFieldPlayground from "./SelectField.playground";
import * as SwitchFieldPlayground from "./SwitchField.playground";
import * as TextFieldPlayground from "./TextField.playground";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;
  age: string;
  bio: string;
  terms: boolean;
  marketing: boolean;
  gender: string;
  country: string;
  birthDate: Date;
  search: string;
  notifications: boolean;
  rating: number;
  avatar: any;
}

const defaultValues: FormData = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  phone: "",
  age: "",
  bio: "",
  terms: false,
  marketing: false,
  gender: "",
  country: "",
  birthDate: new Date(),
  search: "",
  notifications: true,
  rating: 5,
  avatar: null,
};

const genderOptions = [
  { label: "Male", value: "male" },
  { label: "Female", value: "female" },
  { label: "Other", value: "other" },
];

const countryOptions = [
  { label: "United States", value: "us" },
  { label: "United Kingdom", value: "uk" },
  { label: "Canada", value: "ca" },
  { label: "Australia", value: "au" },
  { label: "Germany", value: "de" },
  { label: "France", value: "fr" },
];

// Export individual playgrounds for use in the main playground system
export const playgrounds = {
  textfield: TextFieldPlayground,
  emailfield: EmailFieldPlayground,
  passwordfield: PasswordFieldPlayground,
  checkboxfield: CheckboxFieldPlayground,
  selectfield: SelectFieldPlayground,
  switchfield: SwitchFieldPlayground,
  radiofield: RadioFieldPlayground,
};

export function FieldsPlayground() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues,
  });

  const onSubmit = (data: FormData) => {
    console.log("Form data:", data);
  };

  return (
    <ScrollView className="flex-1 bg-background">
      <View className="space-y-6 p-4">
        <Text className="mb-4 text-2xl font-bold text-foreground">
          Form Fields Playground
        </Text>

        {/* Text Fields */}
        <View className="space-y-4">
          <Text className="text-lg font-semibold text-foreground">
            Text Fields
          </Text>

          <TextField
            control={control}
            name="firstName"
            label="First Name"
            placeholder="Enter your first name"
            required
            error={errors.firstName}
          />

          <TextField
            control={control}
            name="lastName"
            label="Last Name"
            placeholder="Enter your last name"
            required
            error={errors.lastName}
          />
        </View>

        {/* Specialized Text Fields */}
        <View className="space-y-4">
          <Text className="text-lg font-semibold text-foreground">
            Specialized Fields
          </Text>

          <EmailField
            control={control}
            name="email"
            label="Email Address"
            placeholder="Enter your email"
            required
            error={errors.email}
          />

          <PasswordField
            control={control}
            name="password"
            label="Password"
            placeholder="Enter your password"
            required
            error={errors.password}
          />

          <PhoneField
            control={control}
            name="phone"
            label="Phone Number"
            placeholder="Enter your phone number"
            error={errors.phone}
          />

          <NumberField
            control={control}
            name="age"
            label="Age"
            placeholder="Enter your age"
            error={errors.age}
          />
        </View>

        {/* Multi-line Text */}
        <View className="space-y-4">
          <Text className="text-lg font-semibold text-foreground">
            Multi-line Text
          </Text>

          <TextAreaField
            control={control}
            name="bio"
            label="Biography"
            placeholder="Tell us about yourself..."
            error={errors.bio}
          />
        </View>

        {/* Checkboxes */}
        <View className="space-y-4">
          <Text className="text-lg font-semibold text-foreground">
            Checkboxes
          </Text>

          <CheckboxField
            control={control}
            name="terms"
            description="I agree to the terms and conditions"
            linkText="Terms & Conditions"
            onLinkPress={() => console.log("Terms pressed")}
            required
            error={errors.terms}
          />

          <CheckboxField
            control={control}
            name="marketing"
            description="I would like to receive marketing emails"
            error={errors.marketing}
          />
        </View>

        {/* Radio Buttons */}
        <View className="space-y-4">
          <Text className="text-lg font-semibold text-foreground">
            Radio Buttons
          </Text>

          <RadioField
            control={control}
            name="gender"
            label="Gender"
            options={genderOptions}
            direction="horizontal"
            error={errors.gender}
          />
        </View>

        {/* Select Dropdown */}
        <View className="space-y-4">
          <Text className="text-lg font-semibold text-foreground">
            Select Dropdown
          </Text>

          <SelectField
            control={control}
            name="country"
            label="Country"
            options={countryOptions}
            placeholder="Select your country"
            searchable
            error={errors.country}
          />
        </View>

        {/* Date Picker */}
        <View className="space-y-4">
          <Text className="text-lg font-semibold text-foreground">
            Date Picker
          </Text>

          <DateField
            control={control}
            name="birthDate"
            label="Birth Date"
            mode="date"
            error={errors.birthDate}
          />
        </View>

        {/* Search Field */}
        <View className="space-y-4">
          <Text className="text-lg font-semibold text-foreground">
            Search Field
          </Text>

          <SearchField
            control={control}
            name="search"
            placeholder="Search..."
            error={errors.search}
          />
        </View>

        {/* Switch */}
        <View className="space-y-4">
          <Text className="text-lg font-semibold text-foreground">Switch</Text>

          <SwitchField
            control={control}
            name="notifications"
            label="Enable Notifications"
            error={errors.notifications}
          />
        </View>

        {/* Slider */}
        <View className="space-y-4">
          <Text className="text-lg font-semibold text-foreground">Slider</Text>

          <SliderField
            control={control}
            name="rating"
            label="Rating"
            minimumValue={1}
            maximumValue={10}
            step={1}
            showValue
            valueSuffix=" stars"
            error={errors.rating}
          />
        </View>

        {/* File Upload */}
        <View className="space-y-4">
          <Text className="text-lg font-semibold text-foreground">
            File Upload
          </Text>

          <FileField
            control={control}
            name="avatar"
            label="Profile Picture"
            multiple={false}
            error={errors.avatar}
          />
        </View>

        {/* Submit Button */}
        <View className="pt-4">
          <TouchableOpacity
            className="items-center rounded-md bg-primary px-6 py-3"
            onPress={handleSubmit(onSubmit)}
            activeOpacity={0.7}
          >
            <Text className="text-base font-semibold text-white">
              Submit Form
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}
