<template>
  <step-layout>
    <template v-slot:header></template>
    <template v-slot:title>
      <h2>Choose your visa type</h2>
      <p class="px-1 text-gray-700">
        Complete this section to decide the apropriate visa type
      </p>
    </template>
    <template v-slot:content>
      <form-factory
        :value="formData"
        :schema="showing"
        @change="update($event)"
      />
      <!-- <choice-box value="electronic" :options="qualifies" /> -->
    </template>

    <template v-slot:navigation>
      <not-qualify v-if="!qualify"></not-qualify>
      <my-button v-else variant="primary" @click="$emit('next')"
        >Continue</my-button
      >
    </template>
  </step-layout>
</template>

<script>
import {
  reactive,
  set,
  ref,
  computed,
  watchEffect
} from "@vue/composition-api";

import StepLayout from "./StepLayout.vue";
import MyButton from "../navigation/Button.vue";
import FormFactory from "../form/FormFactory.vue";
// import ChoiceBox from "../form/ChoiceBox";
// import TextInput from "../form/TextInput";
// import RadioInput from "../form/RadioInput.vue";
import NotQualify from "../alerts/NotQualify.vue";

import { SCHEMA, visaPurposes, getDurations, getPrice } from "./second.js";
import { eligibleNationalities } from "../../utils/countries.js";

const indexedSchema = () => {
  let indexed = {};
  Object.entries(SCHEMA).forEach(([key, value], index) => {
    indexed[key] = { ...value, index: index };
  });
  return indexed;
};

export default {
  components: { StepLayout, FormFactory, MyButton, NotQualify },
  setup() {
    const formData = reactive({
      passport: null,
      nationality: null,
      visaType: null,
      visaPurpose: null,
      duration: null
    });
    function update(field) {
      let property = Object.keys(field)[0];
      set(formData, property, field[property]);
      setQualify();
      let currentIndex = schema[property].index;
      let conference = currentIndex === 2 && field[property] === "conference";
      let medical = currentIndex === 3 && formData.visaType === "medical";
      let business = currentIndex === 3 && formData.visaType === "business";
      if (currentIndex === 2 && field[property] !== "conference") {
        showVisaPurpose(field[property]);
      }
      if (!conference && !medical && !business) showNext(currentIndex);
      if (conference) {
        formData.visaPurpose = "conference";
        formData.duration = "one";
      }
      if (medical) {
        formData.duration = "two";
      }
      if (business) {
        formData.duration = "twelve";
      }
    }

    const schema = reactive(indexedSchema());
    const showing = computed(() => {
      let showingFields = {};
      for (let field in schema) {
        if (schema[field].visible !== false)
          showingFields[field] = schema[field];
      }
      return showingFields;
    });
    const showNext = currentIndex => {
      if (qualify.value === true) {
        for (let question in schema) {
          if (schema[question].index === currentIndex + 1) {
            schema[question].visible = true;
          }
        }
      } else {
        for (let question in schema) {
          if (schema[question].index > currentIndex) {
            schema[question].visible = false;
          }
        }
      }
    };

    watchEffect(() => {
      if (formData.visaType === "conference") {
        schema.visaPurpose.visible = false;
        schema.duration.visible = false;
      }
      isComplete.value = Object.keys(formData).every(
        field => formData[field] !== null
      );
      if (isComplete.value === true) {
        price.value = getPrice(
          formData.nationality,
          formData.visaType,
          formData.duration
        );
      }
    });
    function showVisaPurpose(value) {
      schema.visaPurpose.choices = visaPurposes[value];
      schema.duration.choices = getDurations(value);
    }

    const qualify = ref(true);
    function setQualify() {
      let p = formData.passport;
      let n = formData.nationality;
      qualify.value =
        (p === "ordinary" || p === null) &&
        (n === null ||
          eligibleNationalities.includes(n) ||
          schema.nationality.visible === false);
    }

    const isComplete = ref(false);

    const price = ref(null);

    return {
      formData,
      schema,
      showing,
      update,
      qualify,
      isComplete,
      price
      // eligible,
      // qualifies
    };
  }
};
</script>