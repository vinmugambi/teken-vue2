<template>
  <step-layout>
    <template v-slot:header> </template>
    <template v-slot:title> <h2>Choose your visa type</h2> </template>
    <template v-slot:content>
      <form-factory
        :value="formData"
        :schema="schema"
        @change="update($event)"
      />
    </template>
    <template v-slot:navigation>
      <my-button variant="primary" @click="$emit('next')">Next</my-button>
    </template>
  </step-layout>
</template>

<script>
import { reactive, set } from "@vue/composition-api";

import StepLayout from "./StepLayout.vue";

import FormFactory from "../form/FormFactory.vue";
import SelectBox from "../form/SelectBox.vue";
import RadioInput from "../form/RadioInput.vue";
import CheckBox from "../form/CheckBox.vue"

import MyButton from "../navigation/Button.vue";

import { allNationalities } from "../../utils/countries.js";

export default {
  components: { StepLayout, FormFactory, MyButton },

  setup() {
    const formData = reactive({});
    const schema = reactive(SCHEMA);

    function update(field) {
      let property = Object.keys(field)[0];
      set(formData, property, field[property]);
    }

    return {
      formData,
      schema,
      update
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
    choices: passportTypes
  },
  nationality: {
    label: "Nationality",
    component: SelectBox,
    choices: nations
  },
  visaType: { label: "Visa type", component: CheckBox, choices: visaTypes },
  visaPurpose: {
    label: "Purpose of travel",
    component: RadioInput,
    choices: [],
    visible: false
  }
};
</script>