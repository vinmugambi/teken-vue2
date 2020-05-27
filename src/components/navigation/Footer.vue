<template>
  <div class="absolute bottom-0 left-0 right-0 text-center text-gray-600 text-xs">
    Teken Mobility {{thisYear}}
  </div>
</template>

<script>
const thisYear = new Date().getFullYear();
export default {
  setup() {
    return { thisYear };
  }
};
</script>