import SelectBox from "../form/SelectBox.vue";
import RadioInput from "../form/RadioInput.vue";
import TextInput from "../form/TextInput.vue";
import { countries } from "./second";

export const india = {
  steps:[0,1],
  0: {
    name: "Contact information",
    id: 0,
    questions: {
      surname: {
        label: "Surname / Family name",
        component: TextInput,
        validation: "required",
      },
      name: {
        label: "Given name(s)",
        component: TextInput,
        validation: "required",
      },
      phone: {
        label: "Phone / Mobile number",
        component: TextInput,
        validation: "required",
      },
      address: {
        label: "Residential address",
        component: TextInput,
        validation: "required",
      },
      country: {
        label: "Country of residence",
        component: SelectBox,
        choices: countries,
        attrs: { placeholder: "Select country where you currently live" },
        validation: "required",
      },
    },
  },
  1: {
    name: "Family information",
    id: 1,
    questions: {
      marital: {
        label: "Marital status",
        component: RadioInput,
        choices: [
          { text: "Single", value: "single" },
          { text: "Married", value: "married" },
        ],
        validation: "required",
      },
      father: {
        label: "Father name",
        component: TextInput,
        validation: "required",
      },
    },
  },
};
