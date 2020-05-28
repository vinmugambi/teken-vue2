<template>
  <input
    type="text"
    class="block w-full py-1 px-2 rounded border focus:bg-gray-100 focus:outline-none"
    :value="value"
    @change="$emit('change', $event.target.value)"
  />
</template>


<script>
export default {
  props: {
    value: {
      required: true,
      type: String
    }
  }
};
</script>

