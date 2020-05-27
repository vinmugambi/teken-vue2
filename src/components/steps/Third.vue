<template>
  <step-layout>
    <template v-slot:header> </template>
    <template v-slot:title>
      Third, step. Bitch
    </template>
    <template v-slot:content> </template>
  </step-layout>
</template>

<script>
import StepLayout from "./StepLayout";
export default {
  components: { StepLayout }
};
</script>