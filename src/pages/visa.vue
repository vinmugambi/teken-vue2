<template>
  <div class="md:pb-16  md:pt-8">
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
    <fifth
      v-if="activeStep === 4"
      v-on:back="previousStep"
      v-on:next="nextStep"
      >{{ activeStep }}</fifth
    >
  </div>
</template>


<script lang="js">
import {ref, onBeforeMount,provide,watchEffect,inject, computed} from '@vue/composition-api'
import {provideFeathers} from "../feathers.js";

import First from '../components/steps/First.vue'
import Second from '../components/steps/Second.vue'
import Third from '../components/steps/Third.vue'
import Fourth from '../components/steps/Fourth.vue'
import Fifth from '../components/steps/Fifth.vue'

export default {
  components: {First, Second, Third, Fourth, Fifth},
  setup(props, {root}) {
    const Store=root.$store;
    let initialStep = ref(0);

    const activeStep = computed({
      get: () =>{
        if (Store.state.step){
        return Store.state.step;}
        else return initialStep.value;
      },
      set: value => {
        Store.commit("patch", {step: value})
      }
    });

    const steps = [0,1,2,3,4];

    function nextStep() {
      if(steps.includes(activeStep.value+1)){
        initialStep = null;
        activeStep.value++}
    }
    function previousStep() {
            if(steps.includes(activeStep.value-1)) {
              initialStep= null;
              activeStep.value--
      }
    }

    provideFeathers();
    const isLoggedIn = ref(null);
    const feathers = inject("feathers");
    onBeforeMount(async () => {
      try {
        await feathers.reAuthenticate();
        isLoggedIn.value = true;
        root.$store.dispatch("initialise");
      } catch (error) {
        isLoggedIn.value = false;
      }
    });

    provide("isLoggedIn", isLoggedIn);

    watchEffect(()=> {
      const State= Store.state;
      if (isLoggedIn.value){
        initialStep.value = State.applications && !(State.applications.length===0 && !State.current)?3:0;
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
