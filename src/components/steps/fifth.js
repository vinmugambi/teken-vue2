import SelectBox from "../form/SelectBox.vue";
import RadioInput from "../form/RadioInput.vue";
import TextInput from "../form/TextInput.vue";
import FileInput from "../form/FileInput.vue";
import { countries } from "./second";

export const india = {
  steps: [0, 1, 2, 3, 4, 5,6],
  0: {
    showing: [0, 1, 2, 3],
    title: "Personal information",
    description:
      "The information in this section is used for identification. The optional fields will be picked from your passport if not filled",
    id: 0,
    questions: {
      surname: {
        index: 0,
        label: "Surname / Family name",
        component: TextInput,
        validation: "",
      },
      name: {
        index: 1,
        label: "Given name(s)",
        component: TextInput,
        validation: "",
      },
      gender: {
        index: 2,
        label: "Gender/ sex",
        component: SelectBox,
        attrs: { placeholder: "Select your gender" },
        choices: [
          { text: "Male", value: "male" },
          { text: "Female", value: "female" },
          { text: "Others", value: "others" },
        ],
      },
      educationLevel: {
        index: 3,
        label: "Education level",
        help: "Highest level of formal education you completed",
        component: SelectBox,
        choices: [
          { text: "No education", value: "no" },
          { text: "Primary education", value: "one" },
          { text: "Secondary education", value: "two" },
          { text: "College/University", value: "three" },
          { text: "Postgraduate", value: "four" },
        ],
      },
    },
  },
  1: {
    title: "Contact information",
    id: 1,
    showing: [0, 1, 2],
    questions: {
      phone: {
        index: 0,
        label: "Phone / Mobile number",
        component: TextInput,
        validation: "required",
      },
      address: {
        index: 1,
        label: "Residential address",
        component: TextInput,
        validation: "required",
      },
      country: {
        index: 2,
        label: "Country of residence",
        component: SelectBox,
        choices: countries,
        attrs: { placeholder: "Select country where you currently live" },
        validation: "required",
      },
    },
  },
  2: {
    title: "Family information",
    showing: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    id: 2,
    questions: {
      marital: {
        index: 0,
        label: "Marital status",
        component: RadioInput,
        choices: [
          { text: "Single", value: "single" },
          { text: "Married", value: "married" },
        ],
        validation: "required",
      },
      spouse: {
        index: 1,
        label: "Spouse name",
        component: TextInput,
        validation: "required",
      },
      spouseNationality: {
        index: 2,
        label: "Nationality of spouse",
        component: SelectBox,
        choices: countries,
        attrs: { placeholder: "Select the nationality of your spouse" },
        validation: "required",
      },
      spousePob: {
        index: 3,
        label: "Spouse's place of birth",
        component: TextInput,
        attrs: { placeholder: "Where was your spouse born" },
        validation: "required",
      },
      spouseCob: {
        index: 4,
        label: "Spouse's nationality",
        component: SelectBox,
        choices: countries,
        attrs: {
          placeholder: "Select the country where your spouse was born",
        },
        validation: "required",
      },
      father: {
        index: 5,
        label: "Father name",
        component: TextInput,
        validation: "required",
      },
      fatherNationality: {
        index: 6,
        label: "Nationality of father",
        component: SelectBox,
        choices: countries,
        attrs: { placeholder: "Select the nationality of your father" },
        validation: "required",
      },
      fatherPob: {
        index: 7,
        label: "Father's place of birth",
        component: TextInput,
        attrs: { placeholder: "Where was your father born" },
        validation: "required",
      },
      fatherCob: {
        index: 8,
        label: "Fathers's nationality",
        component: SelectBox,
        choices: countries,
        attrs: {
          placeholder: "Select the country where your father was born",
        },
        validation: "required",
      },
      mother: {
        index: 9,
        label: "Mother's name",
        component: TextInput,
        validation: "required",
      },
      motherNationality: {
        index: 10,
        label: "Nationality of mother",
        component: SelectBox,
        choices: countries,
        attrs: { placeholder: "Select the nationality of your mother" },
        validation: "required",
      },
      motherPob: {
        index: 11,
        label: "Mother's place of birth",
        component: TextInput,
        attrs: { placeholder: "Where was your mother born" },
        validation: "required",
      },
      motherCob: {
        index: 12,
        label: "Mothers's nationality",
        component: SelectBox,
        choices: countries,
        attrs: {
          placeholder: "Select the country where your mother was born",
        },
        validation: "required",
      },
    },
  },
  3: {
    title: "Work information",
    id: 3,
    showing: [0, 1, 2, 3],
    questions: {
      occupation: {
        index: 0,
        label: "Occupation",
        component: TextInput,
        validation: "required",
      },
      employer: {
        index: 1,
        label: "Employer name",
        help: "Name of the organization/person who has employed you",
        component: TextInput,
        validation: "required",
      },
      employerAddress: {
        index: 2,
        label: "Employer address",
        help: "Physical location of work place",
        component: TextInput,
        validation: "required",
      },
      employerCountry: {
        index: 3,
        label: "Country of employment",
        component: SelectBox,
        choices: countries,
        attrs: { placeholder: "Select country where you work" },
        validation: "required",
      },
    },
  },
  4: {
    title: "Travel information",
    id: 4,
    showing: [0, 1, 2],
    questions: {
      inviter: {
        index: 0,
        //Generate label based on type of visa
        label: "Name of inviting person or organisation",
        component: TextInput,
        validation: "required",
      },
      inviterAddress: {
        index: 1,
        label: "Physical address of inviting person/organization",
        component: TextInput,
        validation: "required",
      },
      inviterPhone: {
        index: 2,
        label: "Phone number of inviter",
        component: TextInput,
        validation: "required",
      },
    },
  },
  5: {
    title: "References",
    description:
      "Information about people or organisations who know you and are aware of your travel to India",
    questions: {
      local: {
        index: 0,
        label: "Local reference",
        //Automatically fill country of residence
        help: "Reference from the country which you a citizen",
        component: TextInput,
        validation: "required",
      },
      localReferenceAddress: {
        index: 1,
        label: "Physical address of local reference",
        component: TextInput,
        validation: "required",
      },
      inviterPhone: {
        index: 2,
        label: "Phone number of local reference",
        component: TextInput,
        validation: "required",
      },
    },
  },
  6: {
    title: "Passport image",
    description:
      "Upload an image showing your the front of your face and shoulders against a one colour background (eg a wall)",
    questions: {
      passportImage: {
        index: 0,
        label: "Upload passport image",
        component: FileInput,
        validation: "required",
        attrs: {accept: ".jpg,.jpeg,.png"}
      },
    },
  },
};
