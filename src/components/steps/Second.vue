<template>
  <step-layout>
    <template v-slot:header></template>
    <template v-slot:title>
      <h2>Choose your visa type</h2>
      <p class="px-1 text-gray-700">
        Complete this section to decide the apropriate visa type and its price
      </p>
    </template>
    <template v-slot:content>
      <form-factory
        :value="formData"
        :schema="showing"
        @change="update($event)"
      />
      <div v-if="isComplete && qualify">
        <span class="px-1 text-xs text-gray-700">visa summary</span>
        <div
          class="p-2  rounded bg-primary-100 bg-opacity-50 border border-primary-300"
        >
          <div class="flex justify-between">
            <div class="text-lg h-8">
              <span> e-{{ formData.visaType }} visa </span>
            </div>
            <div class="flex items-center">USD {{ price }}</div>
          </div>
          <div>
            <span class="pr-2 text-xs uppercase tracking-tight text-gray-600">{{
              getLabel(formData.duration)
            }}</span>
            <a
              href="#"
              class="inline-block pr-2 z-10 text-gray-600 text-xs underline"
              >details</a
            >
            <a href="#" class="z-10 text-gray-600 text-xs underline"
              >pricing?</a
            >
          </div>
        </div>
      </div>
    </template>

    <template v-slot:navigation>
      <not-qualify v-if="!qualify" />
      <div v-else class="py-4 flex justify-between flex-row-reverse">
        <my-button
          :disabled="!isComplete"
          variant="primary"
          @click="$emit('next')"
          >Continue</my-button
        >
        <my-button @click="$emit('back')">Back</my-button>
      </div>
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
import useLocalStorage from "./useLocalStorage.js";

import {
  SCHEMA,
  visaPurposes,
  getDurations,
  getDurationLabel,
  getPrice
} from "./second.js";
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
        Object.entries(formData).forEach(([key, value]) =>
          useLocalStorage.set(key, value)
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

    function getLabel(duration) {
      return getDurationLabel(duration);
    }

    return {
      formData,
      schema,
      showing,
      update,
      qualify,
      isComplete,
      price,
      getLabel
      // eligible,
      // qualifies
    };
  }
};
</script>