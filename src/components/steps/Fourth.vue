<template>
  <step-layout>
    <template v-slot:title>
      <div v-if="applications && !current">
        <h2>You have {{ total }} incomplete applications</h2>
        <p>
          We found incomplete applications that are associated with your email
          address.
        </p>
        <h4 class="pt-2">Select the one you wish to continue with</h4>
      </div>
      <div v-else>
        <h2>{{ questions.current.name }}</h2>
      </div>
    </template>
    <template v-slot:full>
      <ul v-if="applications && !current">
        <li
          class="flex flex-no-wrap justify-between py-2 px-4 border-b border-purple-100 hover:bg-purple-100"
          v-for="visa in applications"
          :key="visa._id"
          @click="setCurrent(visa)"
        >
          <div>
            <div class="leading-tight">
              {{ visa.duration }}
              {{ visa.duration === "one" ? "month" : "months" }}
              {{ visa.visaType }} visa
            </div>
            <div class="text-xs text-gray-600 leading-tight">
              <span class="inline-block mr-2">expand ></span>
              <span>
                Started 5 hours ago
              </span>
            </div>
          </div>
          <div class="static flex items-center z-10 ">
            <button
              @click.stop.once="discard(visa._id)"
              type="button"
              class="p-1 rounded bg-purple-100 hover:bg-red-500"
            >
              discard
            </button>
          </div>
        </li>
      </ul>
    </template>
    <template v-slot:content>
      <span v-if="applications && !current" class="text-xs"
        >All incomplete applications will be discarded in 14 days
        <a href="#">learn more</a></span
      >
      <div v-if="current">
        <form-factory
          :value="current"
          @input="update($event)"
          :schema="questions.current.questions"
        ></form-factory>
      </div>
    </template>
    <template v-slot:navigation>
      <div class="flex justify-between flex-row-reverse">
        <my-button variant="primary" @click="nextStep">Next</my-button>
        <my-button @click="backStep">Back</my-button>
      </div>
    </template>
  </step-layout>
</template>

<script>
import {
  computed,
  onBeforeMount,
  watchEffect,
  reactive
} from "@vue/composition-api";
import StepLayout from "./StepLayout.vue";
import { india } from "./fourth.js";
import FormFactory from "../form/FormFactory.vue";
import MyButton from "../navigation/Button.vue";

export default {
  components: { StepLayout, FormFactory, MyButton },
  setup(props, { root, emit }) {
    const Store = root.$store;
    const applications = computed(() => Store.state.applications);
    const current = computed(() => Store.state.current);
    const total = computed(() => Store.state.totalApplications);
    const currentStep = computed({
      get: () => {
        if (!Store.state.current.currentStep) {
          return india.steps[0];
        } else return Store.state.current.currentStep;
      },
      set: value => {
        Store.commit("input", { currentStep: value });
      }
    });

    const questions = reactive({ current: {} });
    watchEffect(() => (questions.current = india[currentStep.value]));

    function nextStep() {
      if (india.steps.includes(currentStep.value + 1)) {
        currentStep.value = currentStep.value + 1;
      }
      console.log(currentStep.value);
    }
    function backStep() {
      if (currentStep.value === 0) {
        emit("back");
      } else {
        currentStep.value = currentStep.value - 1;
      }
    }
    function setCurrent(visa) {
      Store.commit("patch", { current: visa });
    }
    function discard(id) {
      Store.dispatch("discard", id);
    }
    function update(field) {
      Store.commit("input", field);
    }
    onBeforeMount(async () => Store.dispatch("initialise"));
    return {
      applications,
      setCurrent,
      current,
      total,
      discard,
      questions,
      update,
      nextStep,
      backStep,
      currentStep
    };
  }
};
</script>