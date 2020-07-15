import SelectBox from "./SelectBox.vue";
import RadioInput from "./RadioInput.vue";
import TextInput from "./TextInput.vue";
import FileInput from "./FileInput.vue";
import CheckBox from "./CheckBox.vue";

const INPUT_MAP = {
  select: SelectBox,
  radio: RadioInput,
  text: TextInput,
  file: FileInput,
  checkbox: CheckBox
};

export function mapInput(type) {
  return INPUT_MAP[type];
}
