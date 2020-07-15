<template>
  <step-layout>
    <template v-slot:header></template>
    <template v-slot:title>
      <h2>Choose your visa type</h2>
      <p>
        Complete this section to decide the apropriate visa type and its price
      </p>
    </template>
    <template v-slot:content>
      <form-factory
        :value="formData"
        :schema="showing"
        @input="update($event)"
      />
      <div v-if="isComplete && qualify">
        <span class="px-1 text-xs text-gray-700">visa summary</span>
        <div class="p-4 border rounded">
          <div class="flex justify-between">
            <div class="text-lg h-8">
              <span> e-{{ formData.visaType }} visa </span>
            </div>
            <div class="flex items-center">USD {{ price }}</div>
          </div>
          <div
            class="flex justify-between flex-row-reverse text-xs text-gray-600"
          >
            <span class="text-xs uppercase font-light">{{
              getLabel(formData.duration)
            }}</span>
            <div>
              <a href="#" class="inline-block pr-2 z-10  underline">details</a>
              <a href="#" class="z-10 underline">pricing?</a>
            </div>
          </div>
          <div class="pt-4 flex justify-between flex-row-reverse">
            <my-button variant="primary" @click="$emit('next')"
              >Continue</my-button
            >
            <my-button @click.prevent="$emit('back')">Back</my-button>
          </div>
        </div>
      </div>
    </template>
    <template v-slot:navigation>
      <not-qualify v-if="!qualify" />
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
    const isComplete = ref(false);
    const qualify = ref(true);
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
      if (!qualify.value) {
        formData.visaType = null;
        formData.duration = null;
        formData.visaPurpose = null;
      }
    });
    function showVisaPurpose(value) {
      schema.visaPurpose.choices = visaPurposes[value];
      schema.duration.choices = getDurations(value);
    }

    function setQualify() {
      let p = formData.passport;
      let n = formData.nationality;
      qualify.value =
        (p === "ordinary" || p === null) &&
        (n === null ||
          eligibleNationalities.includes(n) ||
          schema.nationality.visible === false);
    }

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
    };
  }
};
</script>