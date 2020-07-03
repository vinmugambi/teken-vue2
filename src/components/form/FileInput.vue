<template>
  <div class="py-4">
    <div class="h-auto w-full mb-4 bg-purple-200">
      <img :src="url" alt="" />
    </div>
    <input
      type="file"
      ref="upload"
      :class="error ? 'border border-red-300' : 'border'"
      @change="handleUpload"
    />
  </div>
</template>


<script>
import { computed, ref, watchEffect } from "@vue/composition-api";
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
  },
  setup(props, { emit }) {
    const upload = ref(null);
    const url= ref(null)

    function handleUpload(event) {
        console.log(upload.value.files[0]);
        url.value=URL.createObjectURL(upload.value.files[0]);
      emit("input", event.target.value);
    }

    return {
      upload,
      handleUpload,
      url
    };
  }
};
</script>

