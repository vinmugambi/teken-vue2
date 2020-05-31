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

      Continue with:
      <div
        class="px-2 py-1 my-1 rounded border-2 border-blue-200"
        v-for="qualify in qualifies"
        :key="`${qualify.label}-qualify`"
      >
        <div class="flex">
          <div class="w-3/4">
            {{ qualify.label }}
            <span class="uppercase">{{ formData.visaPurpose }}</span> visa
          </div>
          <div>
            USD 100
          </div>
        </div>

        <div class="flex text-xs text-gray-800">
          <details class="flex-1">
            <summary>Details</summary>
            Something small enough to escape casual notice.
          </details>
          <details class="flex-1">
            <summary>Pricing</summary>
            Something small enough to escape casual notice.
          </details>
        </div>
      </div>
    </template>
    <template v-slot:navigation>
      <my-button variant="primary" @click="$emit('next')">Next</my-button>
    </template>
  </step-layout>
</template>

<script>
import { reactive, set, computed, watchEffect } from "@vue/composition-api";

import StepLayout from "./StepLayout.vue";

import FormFactory from "../form/FormFactory.vue";
import SelectBox from "../form/SelectBox.vue";
import RadioInput from "../form/RadioInput.vue";
import TextInput from "../form/TextInput";

import MyButton from "../navigation/Button.vue";

import {
  allNationalities,
  eligibleNationalities
} from "../../utils/countries.js";

export default {
  components: { StepLayout, FormFactory, MyButton },
  setup() {
    const formData = reactive({
      passport: null,
      nationality: null,
      visaType: null,
      visaPurpose: null
    });
    const schema = reactive(SCHEMA);
    const eligible = reactive({
      electronic: { label: "E", qualify: true },
      regular: { label: "Regular", qualify: true }
    });

    const qualifies = computed(() => {
      let qualifies = [];
      for (let type in eligible) {
        if (eligible[type].qualify === true) {
          qualifies.push(eligible[type]);
        }
      }
      return qualifies;
    });

    watchEffect(() => {
      if (formData.passport !== "ordinary") {
        eligible.electronic.qualify = false;
      } else if (!eligibleNationalities.includes(formData.nationality)) {
        eligible.electronic.qualify = false;
      } else {
        eligible.electronic.qualify = true;
      }
    });

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

    return {
      formData,
      schema,
      showing,
      update,
      eligible,
      qualifies
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