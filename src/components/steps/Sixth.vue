<template>
  <step-layout>
    <template v-slot:title>
      <div>
        <h2>Pay for visa</h2>
      </div>
    </template>
    <template v-slot:full>
      <my-button>Pay now</my-button>
    </template>
  </step-layout>
</template>

<script>
import StepLayout from "./StepLayout.vue";
import MyButton from "../navigation/Button.vue";

export default {
  components: {StepLayout, MyButton}
};
</script>
