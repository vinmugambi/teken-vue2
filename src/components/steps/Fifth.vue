<template>
  <step-layout>
    <template v-slot:title>
      <div>
        <h2 v-if="verify">Verify your information</h2>
        <h2 v-else>{{ questions.title }}</h2>
      </div>
    </template>
    <template v-if="verify" v-slot:full>
      <verify v-on:jump="jumpTo($event)" />
    </template>
    <template v-else v-slot:content>
      <div>
        <form-factory
          :value="current"
          @input="update($event)"
          :schema="questions.questions"
        ></form-factory>
      </div>
    </template>
    <template v-slot:navigation>
      <div class="flex justify-between flex-row-reverse">
        <my-button variant="primary" @click="nextStep">{{
          verify ? "Submit" : isLastStep? "Verify": "Next"
        }}</my-button>
        <my-button @click="backStep">Previous</my-button>
      </div>
    </template>
  </step-layout>
</template>

<script>
import { computed, ref, watchEffect } from "@vue/composition-api";
import StepLayout from "./StepLayout.vue";
import { india } from "./fifth.js";
import FormFactory from "../form/FormFactory.vue";
import MyButton from "../navigation/Button.vue";
import Verify from "./verify.vue";

export default {
  components: { StepLayout, FormFactory, MyButton, Verify },
  setup(props, { root, emit }) {
    const Store = root.$store;
    const current = computed(() => Store.state.current);
    const currentStep = computed({
      get: () => {
        if (!Store.state.current || !Store.state.current.currentStep) {
          return india.steps[0];
        } else return Store.state.current.currentStep;
      },
      set: value => {
        Store.commit("input", { currentStep: value });
      }
    });

    const questions = computed(() => india[currentStep.value]);
    const isLastStep = ref(false);
    const verify = ref(false);
    const currentIndex = computed(() => india.steps.indexOf(currentStep.value));

    watchEffect(() => {
      if (currentIndex.value < india.steps.length - 1) {
        isLastStep.value = false;
      } else {
        isLastStep.value = true;
      }
    });

    function nextStep() {
      if (verify.value) {
        emit("next");
      } else if (!isLastStep.value) {
        currentStep.value = india.steps[currentIndex.value + 1];
      } else {
        verify.value = true;
      }
    }

    function backStep() {
      if (verify.value) {
        verify.value = false;
      } else if (currentStep.value === india.steps[0]) {
        emit("back");
      } else {
        currentStep.value = india.steps[currentIndex.value - 1];
      }
    }
    function jumpTo(step) {
      currentStep.value=step;
      verify.value=false;
    }
    function update(field) {
      Store.dispatch("update", field);
    }
    return {
      current,
      questions,
      update,
      nextStep,
      backStep,
      currentStep,
      isLastStep,
      verify,
      jumpTo
    };
  }
};
</script>