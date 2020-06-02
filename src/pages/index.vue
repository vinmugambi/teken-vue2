<template>
  <div class="md:pb-16 pt-2 md:pt-8">
    <first v-if="activeStep === 0" v-on:next="nextStep">{{ activeStep }}</first>
    <second v-if="activeStep === 1" v-on:next="nextStep">{{ activeStep }}</second>
    <third v-if="activeStep === 2"  v-on:next="nextStep">{{ activeStep }}</third>
  </div>
</template>


<script lang="js">
import {ref} from '@vue/composition-api'

import First from '../components/steps/First.vue'
import Second from '../components/steps/Second.vue'
import Third from '../components/steps/Third.vue'

export default {
  components: {First, Second, Third},
  setup() {
    const activeStep = ref(0);

    function nextStep() {
        activeStep.value++
    }

    return {
      nextStep,
      activeStep,
    }
  }
}
</script>
