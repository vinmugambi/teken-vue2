<template>
  <step-layout>
    <template v-slot:header> </template>
    <template v-slot:title> <h2>Choose your visa type</h2> </template>
    <template v-slot:content>
      <form-factory
        :value="formData"
        :schema="showing"
        @change="update($event)"
      />
    </template>
    <template v-slot:navigation>
      <my-button variant="primary" @click="$emit('next')">Next</my-button>
    </template>
  </step-layout>
</template>

<script>
import { reactive, set, computed, watch } from "@vue/composition-api";

import StepLayout from "./StepLayout.vue";

import FormFactory from "../form/FormFactory.vue";
import SelectBox from "../form/SelectBox.vue";
import RadioInput from "../form/RadioInput.vue";
import TextInput from "../form/TextInput";

import MyButton from "../navigation/Button.vue";

import { allNationalities } from "../../utils/countries.js";

export default {
  components: { StepLayout, FormFactory, MyButton },
  setup() {
    const formData = reactive({});
    const schema = reactive(SCHEMA);
    const eligible = reactive({ regular: { type: "" } });

    const showing = computed(() => {
      let showingFields = {};
      for (let field in schema) {
        if (schema[field].visible !== false)
          showingFields[field] = schema[field];
      }
      return showingFields;
    });

    function update(field) {
      let property = Object.keys(field)[0];
      showVisaPurpose(property, field[property]);
      set(formData, property, field[property]);
    }

    function showVisaPurpose(property, value) {
      if (property === "visaType") {
        if (value === "other") {
          schema.visaPurpose.component = TextInput;
        } else {
          schema.visaPurpose.component = RadioInput;
          schema.visaPurpose.choices = visaPurposes[value];
        }
        schema.visaPurpose.visible = true;
      } else return;
    }

    watch(formData,(newValue, oldValue)=> {
      console.log(newValue)
    })

    return {
      formData,
      schema,
      showing,
      update,
      eligible
    };
  }
};

const nations = allNationalities.map(nation => {
  return { value: nation.value, text: nation.country };
});

const visaTypes = [
  { text: "Tourist", value: "tourist" },
  { text: "Business", value: "business" },
  { text: "Medical", value: "medical" },
  { text: "Other", value: "other" }
];

const visaPurposes = {
  tourist: [
    { text: "Visit family or friend", value: "visit" },
    { text: "General tour/ Sight seeing", value: "tour" }
  ],
  business: [
    { text: "Business/technical meetings or training", value: "meeting" },
    { text: "Trade fair", value: "fair" },
    { text: "Purchase or trade", value: "trade" },
    { text: "Other", value: "other" }
  ],
  medical: [
    { text: "Treatment - for patients", value: "patient" },
    { text: "Attendant - accompanying a patient", value: "attendant" },
    { text: "Visiting a patient", value: "visitor" }
  ]
};

const passportTypes = [
  { text: "Ordinary", value: "ordinary" },
  { text: "Diplomatic", value: "diplomatic" },
  { text: "Service", value: "service" },
  { text: "Refugee", value: "refugee" },
  { text: "Other type not listed", value: "other" }
];

const SCHEMA = {
  passport: {
    label: "Passport type",
    component: RadioInput,
    choices: passportTypes,
    validation: "required"
  },
  nationality: {
    label: "Nationality",
    component: SelectBox,
    choices: nations,
    placeholder: "Select your nationality",
    validation: "required"
  },
  visaType: {
    label: "Visa type",
    component: RadioInput,
    choices: visaTypes,
    validation: "required"
  },
  visaPurpose: {
    label: "Purpose of travel",
    component: RadioInput,
    choices: [],
    visible: false,
    validation: "required"
  }
};
</script>