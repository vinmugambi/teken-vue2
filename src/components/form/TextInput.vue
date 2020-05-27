<template>
  <input
    type="text"
    :value="value"
    @change="$emit('change', $event.target.value)"
  />
</template>


<script>
export default {
  props: {
    value: {
      required: true
    }
  }
};
</script>

<style lang="postcss" scoped>
input {
  @apply block border;
}
</style>
