<template>
  <input
    type="text"
    :class="error ? 'border border-red-300' : 'border'"
    class="block w-full py-1 px-2 rounded focus:bg-gray-100 focus:outline-none focus:border-blue-600"
    :value="value"
    @change="$emit('input', $event.target.value)"
  />
</template>


<script>
export default {
  props: {
    value: {
      default: () => "",
      type: String
    },
    error: {
      type: Boolean,
      default: () => false
    }
  }
};
</script>

