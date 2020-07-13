<template>
  <step-layout>
    <template v-slot:title>
      <div>
        <h2>Verify your information</h2>
      </div>
    </template>
    <template v-slot:content>
      <div class="py-2">
        <h4>Documents</h4>
        <ul class="py-2">
          <li
            class="flex py-2 border-b"
            v-for="step in mediaSteps"
            :key="step.title"
          >
            <div class="bg-white w-32" :style="`background-image: url('${$store.state.current[step.questions[0]]}')`">
            </div>
              <div class="pl-4">
              <i class="block leading-tight">{{ step.title }}</i>
              </div>
          </li>
        </ul>
      </div>
    </template>
    <template v-slot:navigation>
      <div class="flex justify-between flex-row-reverse">
        <my-button variant="primary" @click="$emit('next')">Submit</my-button>
        <my-button @click="$emit('back')">Back</my-button>
      </div>
    </template>
  </step-layout>
</template>

<script>
import StepLayout from "./StepLayout.vue";
import MyButton from "../navigation/Button.vue";
import { india } from "./fifth.js";

const steps = india.steps.map(step => {
  let showing = Object.keys(india[step].questions).filter(key => {
    if (india[step].showing) {
      return india[step].showing.includes(india[step].questions[key].index);
    }
  });
  let questions = showing.map(question => {
    if (!india[step].media) {
      return {
        name: question,
        id: india[step].questions[question].index,
        label: india[step].questions[question].label
      };
    } else return question;
  });

  return {
    title: india[step].title,
    id: step,
    questions,
    media: india[step].media || false
  };
});

const mediaSteps = steps.filter(step => step.media === true);
const nonMediaSteps = steps.filter(step => !step.media);

export default {
  components: { StepLayout, MyButton },
  setup() {
    return {
      mediaSteps,
      nonMediaSteps
    };
  }
};
</script>