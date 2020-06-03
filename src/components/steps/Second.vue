<template>
  <step-layout>
    <template v-slot:header></template>
    <template v-slot:title>
      <h2>Choose your visa type</h2>
      <p class="px-1 text-gray-700">Complete this section to decide the apropriate visa type</p>
    </template>
    <template v-slot:content>
      <form-factory :value="formData" :schema="showing" @change="update($event)" />
      <!-- <choice-box value="electronic" :options="qualifies" /> -->
    </template>
    <not-qualify v-if="!qualify" />
    <template v-slot:navigation>
      <my-button variant="primary" @click="$emit('next')">Next</my-button>
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

import { SCHEMA } from "./second.js";
// import { eligibleNationalities } from "../../utils/countries.js";

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
      let currentIndex = schema[property].index;
      showNext(currentIndex);
      // showVisaPurpose(property, field[property]);
      set(formData, property, field[property]);
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
      for (let question in schema) {
        // console.log(schema[question].index);
        if (schema[question].index === currentIndex + 1) {
          schema[question].visible = true;
        }
      }
    };

    const qualify = ref(true);
    watchEffect(() => {
      if (formData.passport !== "ordinary") {
        qualify.value = false;
      }
    });

    // function showVisaPurpose(property, value) {
    //   if (property === "visaType") {
    //     if (value === "other") {
    //       schema.visaPurpose.component = TextInput;
    //       schema.visaPurpose.help =
    //         "Briefly describe the reason for your travel";
    //     } else {
    //       schema.visaPurpose.component = RadioInput;
    //       schema.visaPurpose.choices = visaPurposes[value];
    //     }
    //     schema.duration.choices = getDurations(value);
    //     schema.duration.component = RadioInput;
    //     schema.duration.visible = true;
    //     schema.visaPurpose.visible = true;
    //   } else return;
    // }

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

// const eligible = reactive({
//   electronic: {
//     label: "",
//     value: "electronic",
//     qualify: true,
//     pricing: "USD 83.00"
//   },
//   regular: {
//     label: "",
//     value: "regular",
//     qualify: true,
//     pricing: "USD 88.00"
//   }
// });

// const qualifies = computed({
//   get() {
//     let qualifies = [];
//     for (let type in eligible) {
//       if (eligible[type].qualify === true) {
//         qualifies.push(eligible[type]);
//       }
//     }
//     return qualifies;
//   }
// });

// let questions = [];
//     Object.entries(schema).forEach(([key, value]) =>
//       questions.push({ [key]: value })
//     );
//     function* question() {
//       yield* questions;
//     }
//     const nextQuestion = question().next();
//     function revealNextQuestion() {
//       if (!nextQuestion.done) {
//         nextQuestion;
//       }
//     }
</script>