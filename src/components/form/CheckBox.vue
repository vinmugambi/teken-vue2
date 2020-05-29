<template>
  <div>
    <div v-for="option in options" :key="option.text" class="pl-1">
      <input
        type="checkbox"
        :id="`${option.value}-checkbox`"
        v-model="checked"
        :value="option.value"
      />
      <label class="pl-1" :for="`${option.value}-checkbox`">{{
        option.text
      }}</label>
    </div>
  </div>
</template>

<script>
import { computed } from "@vue/composition-api";
export default {
  props: {
    value: { type: Array, required: false, default: () => [] },
    options: { type: Array, required: true }
  },
  setup(props, { emit }) {
    const checked = computed({
      set: value => {
        emit("change", value);
      },
      get: () => {
        return props.value || [];
      }
    });

    return {
      checked
    };
  }
};
</script>