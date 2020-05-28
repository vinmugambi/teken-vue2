<template>
  <div>
    <div v-for="option in options" :key="option.text" class="radio-option pl-2">
      <input
        type="radio"
        :id="`${option.value}-radio`"
        @change="$emit('change', $event.target.value)"
        :value="option.value"
        :checked="option.value === value"
      />
      <label class="option" :for="`${option.value}-input`">{{
option.text}}</label>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    value: { type: String, required: true },
    options: { type: Array, required: true, default: () => [] }
  }
};
</script>