/* eslint-disable react-hooks/rules-of-hooks */

import { valibotResolver } from "@hookform/resolvers/valibot";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import * as v from "valibot";
import { CheckboxField } from "./CheckboxField";
import { DateField } from "./DateField";
import { EmailField } from "./EmailField";
import { FileField } from "./FileField";
import { NumberField } from "./NumberField";
import { PasswordField } from "./PasswordField";
import { PhoneField } from "./PhoneField";
import { RadioField } from "./RadioField";
import { SearchField } from "./SearchField";
import { SelectField } from "./SelectField";
import { SliderField } from "./SliderField";
import { SwitchField } from "./SwitchField";
import { TextAreaField } from "./TextAreaField";
import { TextField } from "./TextField";

// Valibot schema for comprehensive form validation
const FormSchema = v.object({
  // Personal Information
  firstName: v.pipe(
    v.string(),
    v.minLength(2, "First name must be at least 2 characters"),
    v.maxLength(50, "First name must be less than 50 characters"),
  ),
  lastName: v.pipe(
    v.string(),
    v.minLength(2, "Last name must be at least 2 characters"),
    v.maxLength(50, "Last name must be less than 50 characters"),
  ),
  email: v.pipe(v.string(), v.email("Please enter a valid email address")),
  password: v.pipe(
    v.string(),
    v.minLength(8, "Password must be at least 8 characters"),
    v.regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      "Password must contain uppercase, lowercase, and number",
    ),
  ),
  confirmPassword: v.string(),
  phone: v.pipe(
    v.string(),
    v.regex(/^\+?[\d\s\-\(\)]{10,}$/, "Please enter a valid phone number"),
  ),
  age: v.pipe(
    v.number(),
    v.minValue(13, "Must be at least 13 years old"),
    v.maxValue(120, "Please enter a valid age"),
  ),

  // Preferences
  gender: v.pipe(v.string(), v.minLength(1, "Please select your gender")),
  country: v.pipe(v.string(), v.minLength(1, "Please select your country")),
  interests: v.array(v.string()),

  // Content
  bio: v.optional(
    v.pipe(
      v.string(),
      v.maxLength(500, "Bio must be less than 500 characters"),
    ),
  ),
  skills: v.optional(v.string()),

  // Ratings & Dates
  experience: v.pipe(
    v.number(),
    v.minValue(0, "Experience cannot be negative"),
    v.maxValue(50, "Experience cannot exceed 50 years"),
  ),
  birthDate: v.date("Please select your birth date"),

  // Agreements & Settings
  terms: v.literal(true, "You must accept the terms and conditions"),
  newsletter: v.boolean(),
  notifications: v.boolean(),

  // Files
  avatar: v.optional(v.any()),
});

// Add password confirmation validation
const FormSchemaWithConfirmation = v.pipe(
  FormSchema,
  v.forward(
    v.partialCheck(
      [["password"], ["confirmPassword"]],
      (input) => input.password === input.confirmPassword,
      "Passwords do not match",
    ),
    ["confirmPassword"],
  ),
);

type FormData = v.InferInput<typeof FormSchemaWithConfirmation>;

const genderOptions = [
  { label: "Male", value: "male" },
  { label: "Female", value: "female" },
  { label: "Other", value: "other" },
  { label: "Prefer not to say", value: "not_specified" },
];

const countryOptions = [
  { label: "United States", value: "us" },
  { label: "Canada", value: "ca" },
  { label: "United Kingdom", value: "uk" },
  { label: "Germany", value: "de" },
  { label: "France", value: "fr" },
  { label: "Japan", value: "jp" },
  { label: "Australia", value: "au" },
];

const interestOptions = [
  { label: "Technology", value: "tech" },
  { label: "Sports", value: "sports" },
  { label: "Music", value: "music" },
  { label: "Travel", value: "travel" },
  { label: "Reading", value: "reading" },
  { label: "Gaming", value: "gaming" },
];

const sampleData: FormData = {
  firstName: "John",
  lastName: "Doe",
  email: "john.doe@example.com",
  password: "SecurePass123",
  confirmPassword: "SecurePass123",
  phone: "+1 (555) 123-4567",
  age: 28,
  gender: "male",
  country: "us",
  interests: ["tech", "music"],
  bio: "Full-stack developer with a passion for creating amazing user experiences. Love to learn new technologies and share knowledge with the community.",
  skills: "React, TypeScript, Node.js",
  experience: 5,
  birthDate: new Date("1995-06-15"),
  terms: true,
  newsletter: true,
  notifications: false,
  avatar: null,
};

export const components: PlaygroundComponent[] = [
  {
    id: "complete-form-example",
    name: "Complete Form with All Fields",
    description:
      "Comprehensive form showcasing all field components with Valibot validation",
    component: () => {
      const [showFormState, setShowFormState] = useState(true);
      const [submitResult, setSubmitResult] = useState<string | null>(null);

      const {
        control,
        handleSubmit,
        reset,
        setValue,
        watch,
        formState: { errors, isValid, isDirty, touchedFields },
      } = useForm<FormData>({
        resolver: valibotResolver(FormSchemaWithConfirmation),
        defaultValues: {
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          confirmPassword: "",
          phone: "",
          age: 18,
          gender: "",
          country: "",
          interests: [],
          bio: "",
          skills: "",
          experience: 0,
          birthDate: new Date(),
          newsletter: false,
          notifications: true,
          avatar: null,
        },
        mode: "onChange",
      });

      const formData = watch();

      const onSubmit = (data: FormData) => {
        console.log("Form submitted:", data);
        setSubmitResult("Form submitted successfully! Check console for data.");
        setTimeout(() => setSubmitResult(null), 3000);
      };

      const fillSampleData = () => {
        Object.entries(sampleData).forEach(([key, value]) => {
          setValue(key as keyof FormData, value, {
            shouldValidate: true,
            shouldDirty: true,
          });
        });
      };

      const resetForm = () => {
        reset();
        setSubmitResult(null);
      };

      return (
        <View className="flex-1">
          <ScrollView className="flex-1 p-4">
            <View className="mb-6">
              <Text className="mb-2 text-2xl font-bold text-foreground">
                Complete Form Example
              </Text>
              <Text className="mb-4 text-muted-foreground">
                This form demonstrates all field components working together
                with React Hook Form and Valibot validation.
              </Text>

              {/* Action Buttons */}
              <View className="mb-6 flex-row flex-wrap gap-2">
                <TouchableOpacity
                  onPress={fillSampleData}
                  className="bg-secondary rounded-md px-4 py-2"
                >
                  <Text className="text-secondary-foreground font-medium">
                    Fill Sample Data
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={resetForm}
                  className="bg-muted rounded-md px-4 py-2"
                >
                  <Text className="font-medium text-muted-foreground">
                    Reset Form
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => setShowFormState(!showFormState)}
                  className="bg-accent rounded-md px-4 py-2"
                >
                  <Text className="text-accent-foreground font-medium">
                    {showFormState ? "Hide" : "Show"} Form State
                  </Text>
                </TouchableOpacity>
              </View>

              {/* Form State Indicator */}
              <View className="bg-muted mb-6 flex-row flex-wrap gap-4 rounded-md p-3">
                <Text
                  className={`text-sm ${isValid ? "text-green-600" : "text-red-600"}`}
                >
                  Valid: {isValid ? "Yes" : "No"}
                </Text>
                <Text
                  className={`text-sm ${isDirty ? "text-yellow-600" : "text-gray-600"}`}
                >
                  Dirty: {isDirty ? "Yes" : "No"}
                </Text>
                <Text className="text-sm text-muted-foreground">
                  Errors: {Object.keys(errors).length}
                </Text>
                <Text className="text-sm text-muted-foreground">
                  Touched: {Object.keys(touchedFields).length}
                </Text>
              </View>

              {submitResult && (
                <View className="mb-6 rounded-md border border-green-200 bg-green-50 p-3">
                  <Text className="text-green-800">{submitResult}</Text>
                </View>
              )}
            </View>

            {/* Personal Information Section */}
            <View className="mb-8">
              <Text className="mb-4 text-lg font-semibold text-foreground">
                Personal Information
              </Text>
              <View className="space-y-4">
                <View className="flex-row gap-4">
                  <View className="flex-1">
                    <TextField
                      control={control}
                      name="firstName"
                      label="First Name"
                      placeholder="Enter your first name"
                      required
                      error={errors.firstName}
                    />
                  </View>
                  <View className="flex-1">
                    <TextField
                      control={control}
                      name="lastName"
                      label="Last Name"
                      placeholder="Enter your last name"
                      required
                      error={errors.lastName}
                    />
                  </View>
                </View>

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
                  placeholder="Create a secure password"
                  required
                  error={errors.password}
                  helperText="Must contain uppercase, lowercase, and number"
                />

                <PasswordField
                  control={control}
                  name="confirmPassword"
                  label="Confirm Password"
                  placeholder="Confirm your password"
                  required
                  error={errors.confirmPassword}
                />

                <PhoneField
                  control={control}
                  name="phone"
                  label="Phone Number"
                  placeholder="Enter your phone number"
                  required
                  error={errors.phone}
                />

                <NumberField
                  control={control}
                  name="age"
                  label="Age"
                  placeholder="Enter your age"
                  required
                  error={errors.age}
                />

                <DateField
                  control={control}
                  name="birthDate"
                  label="Birth Date"
                  mode="date"
                  maximumDate={new Date()}
                  error={errors.birthDate}
                />
              </View>
            </View>

            {/* Preferences Section */}
            <View className="mb-8">
              <Text className="mb-4 text-lg font-semibold text-foreground">
                Preferences
              </Text>
              <View className="space-y-4">
                <RadioField
                  control={control}
                  name="gender"
                  label="Gender"
                  options={genderOptions}
                  direction="horizontal"
                  required
                  error={errors.gender}
                />

                <SelectField
                  control={control}
                  name="country"
                  label="Country"
                  options={countryOptions}
                  placeholder="Select your country"
                  required
                  error={errors.country}
                />

                <SelectField
                  control={control}
                  name="interests"
                  label="Interests"
                  options={interestOptions}
                  placeholder="Select your interests"
                  multiple
                  error={errors.interests?.[0]}
                />
              </View>
            </View>

            {/* Content Section */}
            <View className="mb-8">
              <Text className="mb-4 text-lg font-semibold text-foreground">
                About You
              </Text>
              <View className="space-y-4">
                <TextAreaField
                  control={control}
                  name="bio"
                  label="Biography"
                  placeholder="Tell us about yourself..."
                  error={errors.bio}
                  helperText="Maximum 500 characters"
                />

                <SearchField
                  control={control}
                  name="skills"
                  label="Skills"
                  placeholder="Search and add your skills..."
                  error={errors.skills}
                />

                <SliderField
                  control={control}
                  name="experience"
                  label="Years of Experience"
                  minimumValue={0}
                  maximumValue={50}
                  step={1}
                  showValue
                  valueSuffix=" years"
                  error={errors.experience}
                />
              </View>
            </View>

            {/* Settings Section */}
            <View className="mb-8">
              <Text className="mb-4 text-lg font-semibold text-foreground">
                Settings
              </Text>
              <View className="space-y-4">
                <SwitchField
                  control={control}
                  name="notifications"
                  label="Push Notifications"
                  error={errors.notifications}
                  helperText="Receive updates about your account"
                />

                <CheckboxField
                  control={control}
                  name="newsletter"
                  label="Newsletter Subscription"
                  description="Subscribe to our weekly newsletter"
                  error={errors.newsletter}
                />

                <CheckboxField
                  control={control}
                  name="terms"
                  label="Terms and Conditions"
                  description="I have read and agree to the"
                  linkText="terms and conditions"
                  onLinkPress={() => console.log("Open terms")}
                  required
                  error={errors.terms}
                />
              </View>
            </View>

            {/* File Upload Section */}
            <View className="mb-8">
              <Text className="mb-4 text-lg font-semibold text-foreground">
                Profile Picture
              </Text>
              <FileField
                control={control}
                name="avatar"
                label="Avatar"
                accept={["image/*"]}
                maxSize={5 * 1024 * 1024} // 5MB
                error={errors.avatar as any}
                helperText="Upload a profile picture (max 5MB)"
              />
            </View>

            {/* Submit Button */}
            <TouchableOpacity
              onPress={handleSubmit(onSubmit)}
              className={`w-full rounded-md py-4 ${
                isValid ? "bg-primary" : "bg-muted"
              }`}
              disabled={!isValid}
            >
              <Text
                className={`text-center font-semibold ${
                  isValid ? "text-primary-foreground" : "text-muted-foreground"
                }`}
              >
                Submit Form
              </Text>
            </TouchableOpacity>

            {/* Form State Display */}
            {showFormState && (
              <View className="bg-muted mt-8 rounded-md p-4">
                <Text className="mb-3 text-lg font-semibold text-foreground">
                  Form State (Real-time)
                </Text>
                <ScrollView className="max-h-96">
                  <Text className="font-mono text-xs text-muted-foreground">
                    {JSON.stringify(
                      {
                        values: formData,
                        errors: errors,
                        isValid,
                        isDirty,
                        touchedFields,
                      },
                      null,
                      2,
                    )}
                  </Text>
                </ScrollView>
              </View>
            )}
          </ScrollView>
        </View>
      );
    },
    code: `import { valibotResolver } from "@hookform/resolvers/valibot";
import { useForm } from "react-hook-form";
import * as v from "valibot";

const FormSchema = v.object({
  firstName: v.pipe(v.string(), v.minLength(2)),
  email: v.pipe(v.string(), v.email()),
  // ... other fields
});

function MyForm() {
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: valibotResolver(FormSchema),
    mode: "onChange"
  });

  return (
    <View>
      <TextField
        control={control}
        name="firstName"
        error={errors.firstName}
      />
      {/* ... other fields */}
    </View>
  );
}`,
    variations: [],
  },
];

export const usageGuidelines = {
  title: "📋 Usage Guidelines",
  content: `This playground demonstrates a complete form implementation using all available field components
with React Hook Form and Valibot validation. Use this as a reference for building complex forms in your
application. The form includes real-time validation, error handling, form state management, and
comprehensive field types.`,
};

export const bestPractices = {
  title: "✅ Best Practices",
  practices: [
    "Use Valibot for type-safe schema validation",
    "Enable real-time validation with mode: 'onChange'",
    "Group related fields in logical sections",
    "Provide clear labels and helper text",
    "Show form state indicators for better UX",
    "Implement proper error handling and display",
    "Use appropriate field types for data input",
    "Validate password confirmation separately",
    "Provide sample data for testing",
    "Include form reset functionality",
    "Show loading states during submission",
    "Use disabled state for invalid forms",
  ],
};

export const meta = {
  id: "form-fields-complete",
  name: "Complete Form Example",
  icon: "📋",
  description:
    "Comprehensive form showcasing all field components with validation",
  componentCount: components.length,
  usageGuidelines,
  bestPractices,
};
