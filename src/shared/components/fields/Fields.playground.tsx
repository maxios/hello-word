// Import individual playgrounds
import * as CheckboxFieldPlayground from "./CheckboxUI.playground";
import * as DateFieldPlayground from "./DateUI.playground";
import * as EmailFieldPlayground from "./EmailFieldUI.playground";
import * as FileFieldPlayground from "./FileUI.playground";
import * as FormFieldsPlayground from "./FormFields.playground";
import * as NumberFieldPlayground from "./NumberFieldUI.playground";
import * as PasswordFieldPlayground from "./PasswordFieldUI.playground";
import * as PhoneFieldPlayground from "./PhoneFieldUI.playground";
import * as RadioFieldPlayground from "./RadioUI.playground";
import * as SearchFieldPlayground from "./SearchFieldUI.playground";
import * as SelectFieldPlayground from "./SelectUI.playground";
import * as SliderFieldPlayground from "./SliderUI.playground";
import * as SwitchFieldPlayground from "./SwitchUI.playground";
import * as TextFieldPlayground from "./TextFieldUI.playground";

// Export individual playgrounds for use in the main playground system
export const playgrounds = {
  textfield: TextFieldPlayground,
  emailfield: EmailFieldPlayground,
  passwordfield: PasswordFieldPlayground,
  checkboxfield: CheckboxFieldPlayground,
  selectfield: SelectFieldPlayground,
  switchfield: SwitchFieldPlayground,
  radiofield: RadioFieldPlayground,
  phonefield: PhoneFieldPlayground,
  filefield: FileFieldPlayground,
  datefield: DateFieldPlayground,
  numberfield: NumberFieldPlayground,
  sliderfield: SliderFieldPlayground,
  searchfield: SearchFieldPlayground,
  formfields: FormFieldsPlayground,
};
