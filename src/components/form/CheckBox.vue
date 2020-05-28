<template>
  <div>
    <div v-for="option in options" :key="option.text" class="pl-2">
      <input
        type="checkbox"
        :id="`${option.value}-checkbox`"
        @change="$emit('change', $event.target.value)"
        :value="value"
      />
      <label class="option" :for="`${option.value}-checkbox`">{{option.text}}</label>
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