import { allNationalities } from "../../utils/countries.js";

const nations = allNationalities.map((nation) => {
  return { value: nation.value, text: nation.country };
});

export const countries =nations;

const visaTypes = [
  { text: "Tourist", value: "tourist" },
  { text: "Business", value: "business" },
  { text: "Medical", value: "medical" },
  { text: "Conference", value: "conference" },
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
    component: "radio",
    choices: passportTypes,
    validation: "required",
    help:
      "Type of the passport you are travelling with. If not sure, enter ordinary",
  },
  nationality: {
    label: "Nationality",
    component: "select",
    choices: nations,
    attrs: { placeholder: "Select your nationality" },
    validation: "required",
    visible: false,
  },
  visaType: {
    label: "Visa type",
    component: "radio",
    choices: visaTypes,
    validation: "required",
    visible: false,
  },
  visaPurpose: {
    label: "Purpose of travel",
    component: "radio",
    choices: [],
    visible: false,
    validation: "required",
  },
  duration: {
    label: "Duration of visa",
    component: "radio",
    visible: false,
    validation: "required",
    options: [],
    attrs: {
      placeholder: "How long are you going to stay in India",
      type: "number",
      min: "1",
    },
  },
};

const evisaPrices = [
  {
    price: 25,
    tourist: "one",
    nationality: { except: ["ARGENTINA", "SOUTH AFRICA"], is: [] },
  },
  {
    price: 40,
    tourist: "twelve",
    nationality: { except: ["ARGENTINA", "SOUTH AFRICA"], is: [] },
  },
  {
    price: 80,
    conference: "one",
    medical: "two",
    business: "twelve",
    tourist: "sixty",
    nationality: {
      except: [
        "ARGENTINA",
        "SOUTH AFRICA",
        "UNITED STATES OF AMERICA",
        "UNITED KINGDOM",
      ],
      is: [],
    },
  },
  {
    price: 100,
    medical: "two",
    business: "twelve",
    nationality: {
      is: ["UNITED STATES OF AMERICA", "UNITED KINGDOM"],
      except: [],
    },
  },
  {
    price: 80,
    tourist: "sixty",
    nationality: {
      is: ["UNITED STATES OF AMERICA", "UNITED KINGDOM"],
      except: [],
    },
  },
];

export const getPrice = (nationality, visaType, duration) => {
  let price = evisaPrices.filter((price) => {
    if (Object.keys(price).includes(visaType) && price[visaType] === duration) {
      if (
        price.nationality.is.includes(nationality) ||
        !price.nationality.except.includes(nationality)
      ) {
        return true;
      }
    }
  });

  if (price.length > 0) {
    return price[0].price;
  } else {
    return 0;
  }
};

const durations = [
  {
    text: "1 month - single entry",
    value: "one",
    tourist: "electronic",
    conference: "electronic",
    extendable: false,
  },
  {
    text: "2 months - double entry",
    value: "two",
    medical: "electronic",
    extendable: true,
  },
  {
    text: "1 year - multiple entry",
    value: "twelve",
    tourist: ["electronic", "regular"],
    business: ["regular", "electronic"],
  },
  { text: "5 years - multiple entry", value: "sixty", tourist: "electronic" },
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
  return durationValues;
};

export const getDurationLabel = (durationValue) => {
  let label = durations.filter((duration) => duration.value === durationValue);
  return label[0].text;
};
