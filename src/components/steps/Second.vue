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
        >Next</my-button
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

import { SCHEMA, visaPurposes, getDurations } from "./second.js";
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
      visaPurpose: null
    });
    function update(field) {
      let property = Object.keys(field)[0];
      set(formData, property, field[property]);
      setQualify();
      let currentIndex = schema[property].index;
      let noShow = currentIndex === 2 && field[property] === "conference";
      if (currentIndex === 2 && field[property] !== "conference") {
        showVisaPurpose(field[property]);
      }
      if (!noShow) showNext(currentIndex);
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
      console.log(currentIndex, qualify.value);
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

    return {
      formData,
      schema,
      showing,
      update,
      qualify
      // eligible,
      // qualifies
    };
  }
};
</script>