<template>
  <div class="md:pb-16 pt-2 md:pt-8">
    <first v-if="activeStep === 0" v-on:next="nextStep">{{ activeStep }}</first>
    <second v-if="activeStep === 1" v-on:next="nextStep">{{
      activeStep
    }}</second>
    <third
      v-if="activeStep === 2"
      v-on:back="previousStep"
      v-on:next="nextStep"
      >{{ activeStep }}</third
    >
    <fourth
      v-if="activeStep === 3"
      v-on:back="previousStep"
      v-on:next="nextStep"
      >{{ activeStep }}</fourth
    >
  </div>
</template>


<script lang="js">
import {ref, onMounted,provide,watchEffect,inject} from '@vue/composition-api'
import {provideFeathers} from "../feathers.js";

import First from '../components/steps/First.vue'
import Second from '../components/steps/Second.vue'
import Third from '../components/steps/Third.vue'
import Fourth from '../components/steps/Fourth.vue'

export default {
  components: {First, Second, Third, Fourth},
  setup() {
    const activeStep = ref(0);

    function nextStep() {
        activeStep.value++
    }
    function previousStep() {
      activeStep.value--
    }

    provideFeathers();
    const isLoggedIn = ref(null);
    const feathers = inject("feathers");
    onMounted(async () => {
      try {
        await feathers.reAuthenticate();
        isLoggedIn.value = true;
      } catch (error) {
        isLoggedIn.value = false;
      }
    });

    provide("isLoggedIn", isLoggedIn);

    watchEffect(()=> {
      if (isLoggedIn.value===true) {
        activeStep.value= 3;
      }
    })

    return {
      nextStep,
      activeStep,
      previousStep,
      isLoggedIn
    }
  }
}
</script>
