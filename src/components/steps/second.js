import { allNationalities } from "../../utils/countries.js";

import SelectBox from "../form/SelectBox.vue";
import RadioInput from "../form/RadioInput.vue";

const nations = allNationalities.map((nation) => {
  return { value: nation.value, text: nation.country };
});

const visaTypes = [
  { text: "Tourist", value: "tourist" },
  { text: "Business", value: "business" },
  { text: "Medical", value: "medical" },
  { text: "Other", value: "other" },
];

export const visaPurposes = {
  tourist: [
    { text: "Visit family or friend", value: "visit" },
    { text: "General tour/ Sight seeing", value: "tour" },
  ],
  business: [
    { text: "Business/technical meetings or training", value: "meeting" },
    { text: "Trade fair", value: "fair" },
    { text: "Purchase or trade", value: "trade" },
    { text: "Other", value: "other" },
  ],
  medical: [
    { text: "Treatment - for patients", value: "patient" },
    { text: "Attendant - accompanying a patient", value: "attendant" },
    { text: "Visiting a patient", value: "visitor" },
  ],
};

const passportTypes = [
  { text: "Ordinary", value: "ordinary" },
  { text: "Diplomatic", value: "diplomatic" },
  { text: "Service", value: "service" },
  { text: "Refugee", value: "refugee" },
  { text: "Other type not listed", value: "other" },
];

export const SCHEMA = {
  passport: {
    label: "Passport type",
    component: RadioInput,
    choices: passportTypes,
    validation: "required",
    help:
      "Type of the passport you are travelling with. If not sure, enter ordinary",
  },
  nationality: {
    label: "Nationality",
    component: SelectBox,
    choices: nations,
    attrs: { placeholder: "Select your nationality" },
    validation: "required",
  },
  visaType: {
    label: "Visa type",
    component: RadioInput,
    choices: visaTypes,
    validation: "required",
  },
  visaPurpose: {
    label: "Purpose of travel",
    component: RadioInput,
    choices: [],
    visible: false,
    validation: "required",
  },
  duration: {
    label: "Duration of visa (in months)",
    component: null,
    visible: false,
    validation: "required|between:1,60",
    options: [],
    attrs: {
      placeholder: "How long are you going to stay in India",
      type: "number",
      min: "1",
      max: "60",
    },
  },
};

// const evisaPrices = [
//   {
//     price: 25,
//     tourist: 1,
//     nationality: { except: ["ARGENTINA", "SOUTH AFRICA"] },
//   },
//   {
//     price: 80,
//     conference: 1,
//     medical: 2,
//     business: 12,
//     tourist: 60,
//     nationality: {
//       except: [
//         "ARGENTINA",
//         "SOUTH AFRICA",
//         "UNITED STATES OF AMERICA",
//         "UNITED KINGDOM",
//       ],
//     },
//   },
//   {
//     price: 100,
//     medical: 2,
//     business: 12,
//     nationality: { is: ["UNITED STATES OF AMERICA", "UNITED KINGDOM"] },
//   },
//   {
//     price: 80,
//     tourist: 60,
//     nationality: { is: ["UNITED STATES OF AMERICA", "UNITED KINGDOM"] },
//   },
// ];

const durations = [
  {
    text: "1 month - single entry",
    value: 1,
    tourist: "electronic",
    conference: "electronic",
    extendable: false,
  },
  {
    text: "2 months - double entry",
    value: "2",
    medical: "electronic",
    extendable: true,
  },
  {
    text: "Up to 6 months - triple entry",
    value: "6",
    medical: "regular",
  },
  {
    text: "1 year - multiple entry",
    value: 12,
    tourist: ["electronic", "regular"],
    medical: "regular",
    business: ["regular", "electronic"],
  },
  { text: "5 years multiple entry", value: 60, tourist: "electronic" },
];

export const getDurations = (visaType) => {
  let visaDurations = durations.filter((duration) => {
    if (Object.keys(duration).includes(visaType)) {
      return true;
    }
  });
  let durationValues = visaDurations.map((duration) => {
    return { text: duration.text, value: duration.value };
  });
  return durationValues
};
