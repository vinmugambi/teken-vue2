<template>
  <div class="md:pb-16  md:pt-8">
    <first
      v-if="activeStep === 0"
      v-on:next="nextStep"
      v-on:resume="resumeApplication"
      >{{ activeStep }}</first
    >

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
import {ref, onBeforeMount,watchEffect,inject, computed} from '@vue/composition-api'
import {provideFeathers} from "../feathers.js";

import First from '../components/steps/First.vue'
import Second from '../components/steps/Second.vue'
import Third from '../components/steps/Third.vue'
import Fourth from '../components/steps/Fourth.vue'
import Fifth from '../components/steps/Fifth.vue'

export default {
  components: {First,Second, Third, Fourth, Fifth},
  setup(props, {root}) {
    const Store=root.$store;
    const initialStep = ref(null);

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

    const steps = ref([0,1,2,3,4]);
    const activeStepIndex=computed(() =>steps.value.indexOf(activeStep.value));
    const isLastStep = ref(false);

    watchEffect(() => {
      if (activeStepIndex.value < steps.value.length - 1) {
        isLastStep.value = false;
      } else {
        isLastStep.value = true;
      }
    });


    function nextStep() {
      if(!isLastStep.value){
        activeStep.value = steps.value[activeStepIndex.value + 1];
      }
    }

    function previousStep() {
      if(activeStepIndex.value>0){
       activeStep.value = steps.value[activeStepIndex.value -1];
      }
    }

    function resumeApplication(){
      activeStep.value=2;
    }

    provideFeathers();
    const userHasApplications=computed(()=> Store.getters.userHasApplications)
    const feathers = inject("feathers");
    onBeforeMount(async () => {
      try {
        await feathers.reAuthenticate();
        Store.commit("patch", {loggedIn: true})
        await  Store.dispatch("initialise");
        if(userHasApplications.value){
          initialStep.value= 3
        }else {
          initialStep.value= 0
        }
      } catch (error) {
        Store.commit("patch", {loggedIn: false})
        initialStep.value=0;
      }
    });


    return {
      nextStep,
      activeStep,
      previousStep,
      steps,
      initialStep,
      activeStepIndex,
      isLastStep,
      resumeApplication,
      userHasApplications
    }
  }
}
</script>
