<template>
  <button
    ref="button"
    class="btn"
    :class="[loading ? 'btn-loading cursor-wait':'font-bold',{'cursor-not-allowed':disabled},`btn-${variant}`]"
    @click="$emit('click')"
    :disabled="disabled || loading"
  >
    <span v-if="loading ===true">Loading ...</span>
    <slot v-else></slot>
  </button>
</template>

<script lang="ts">
export default {
  props: {
    variant: {
      type: String,
      default: 'default'
    },
    disabled: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="postcss">
.btn {
  @apply py-1 px-4 rounded;
}
.btn:disabled {
  @apply bg-opacity-50;
}
.btn:focus {
  @apply outline-none;
}
.btn:active,
.btn-loading {
  animation-duration: 0.5s;
  animation-iteration-count: infinite;
  animation-name: loading;
  animation-direction: alternate;
  animation-timing-function: ease-out;
}
.btn-primary {
  @apply bg-primary-800 text-white;
}
.btn-primary:hover:enabled {
  @apply bg-primary-700;
}
.btn-primary:focus:enabled {
  @apply bg-primary-900;
}
.btn-default {
  @apply border text-gray-700 bg-gray-200;
}
.btn-default:hover:enabled {
  @apply text-primary-700;
}
.btn-default:focus:enabled {
  @apply bg-gray-300 text-black;
}


@keyframes loading {
  0% {
    opacity: 0.9;
  }
  100% {
    opacity: 0.5;
  }
}
</style>



