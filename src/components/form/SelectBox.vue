<template>
  <div class="block relative">
    <select :value="value" @change="$emit('change', $event.target.value)">
      <!-- <option value>{{input.placeholder}}</option> -->
      <option
        v-for="option in options"
        :key="`${option.value}-option`"
        >{{ option.text}}</option
      >
    </select>
    <div
      class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700"
    >
      <svg
        class="fill-current h-4 w-4"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
      >
        <path
          d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
        />
      </svg>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      required: true
    },
    options: { type: Array, required: true, default: () => [] }
  }
};
</script>
<style lang="postcss">
select {
  @apply block appearance-none text-sm w-full bg-white border border-gray-400 px-2 py-1 pr-8 rounded tracking-tighter;
}
select:focus {
  @apply outline-none border-blue-400;
}
select option {
  @apply text-xs;
}
</style>