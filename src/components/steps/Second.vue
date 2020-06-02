<template>
  <step-layout>
    <template v-slot:header></template>
    <template v-slot:title>
      <h2>Choose your visa type</h2>
    </template>
    <template v-slot:content>
      <form-factory
        :value="formData"
        :schema="showing"
        @change="update($event)"
      />Continue with:
      <choice-box value="electronic" :options="qualifies" />
    </template>
    <template v-slot:navigation>
      <my-button variant="primary" @click="$emit('next')">Next</my-button>
    </template>
  </step-layout>
</template>

<script>
import { reactive, set, computed, watchEffect } from "@vue/composition-api";

import StepLayout from "./StepLayout.vue";
import MyButton from "../navigation/Button.vue";
import FormFactory from "../form/FormFactory.vue";
import ChoiceBox from "../form/ChoiceBox";
import TextInput from "../form/TextInput";
import RadioInput from "../form/RadioInput.vue";

import { SCHEMA, visaPurposes, getDurations } from "./second.js";
import { eligibleNationalities } from "../../utils/countries.js";

export default {
  components: { StepLayout, FormFactory, MyButton, ChoiceBox },
  setup() {
    const formData = reactive({
      passport: null,
      nationality: null,
      visaType: null,
      visaPurpose: null
    });
    const schema = reactive(SCHEMA);
    const eligible = reactive({
      electronic: {
        label: "",
        value: "electronic",
        qualify: true,
        pricing: "USD 83.00"
      },
      regular: {
        label: "",
        value: "regular",
        qualify: true,
        pricing: "USD 88.00"
      }
    });

    const qualifies = computed({
      get() {
        let qualifies = [];
        for (let type in eligible) {
          if (eligible[type].qualify === true) {
            qualifies.push(eligible[type]);
          }
        }
        return qualifies;
      }
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
          schema.visaPurpose.help =
            "Briefly describe the reason for your travel";
        } else {
          schema.visaPurpose.component = RadioInput;
          schema.visaPurpose.choices = visaPurposes[value];
        }
        schema.duration.choices = getDurations(value);
        schema.duration.component = RadioInput;
        schema.duration.visible = true;
        schema.visaPurpose.visible = true;
        let visaType = value === "other" ? "" : value;
        for (let type in eligible) {
          eligible[type].label = `${eligible[type].value} ${visaType}`;
        }
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
</script>