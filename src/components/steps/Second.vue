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

import StepLayout from "./StepLayout";

import FormFactory from "../form/FormFactory.vue";
import TextInput from "../form/TextInput.vue";

import MyButton from "../navigation/Button.vue";

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

const SCHEMA = {
  passport: {
    label: "Passport type",
    component: TextInput
  },
  nationality: {
    label: "Nationality",
    component: TextInput
  },
  visaType: { label: "Visa type", component: TextInput },
  visaPurpose: { label: "Purpose of travel", component: TextInput }
};
</script>