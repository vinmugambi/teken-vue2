<template>
  <div>
    <div v-for="option in options" :key="option.text" class="pl-1">
      <input
        type="radio"
        :id="`${option.value}-radio`"
        @change="$emit('change', $event.target.value)"
        :value="option.value"
        :checked="option.value === value"
      />
      <label class="pl-1" :for="`${option.value}-input`">{{
        option.text
      }}</label>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    value: { type: String, required: false, default: () => "" },
    options: { type: Array, required: true }
  }
};
</script>