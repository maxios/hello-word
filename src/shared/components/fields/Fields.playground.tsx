// Import individual playgrounds
import * as CheckboxFieldPlayground from "./CheckboxField.playground";
import * as EmailFieldPlayground from "./EmailField.playground";
import * as PasswordFieldPlayground from "./PasswordField.playground";
import * as RadioFieldPlayground from "./RadioField.playground";
import * as SelectFieldPlayground from "./SelectField.playground";
import * as SwitchFieldPlayground from "./SwitchUI.playground";
import * as TextFieldPlayground from "./TextField.playground";

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
