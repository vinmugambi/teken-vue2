<template>
  <div class="pt-2">
    <div class="h-auto w-full pb-2">
      <img :src="url" class="border" alt="" />
    </div>
    <label
      for="upload-image"
      class="inline-block px-2 py-1 bg-primary-800 cursor-pointer rounded text-white font-bold"
      >{{ url ? "change image" : "upload image" }}</label
    >
    <input
      type="file"
      ref="upload"
      class="block opacity-0 h-0"
      id="upload-image"
      @change="handleUpload"
    />
    <div
      v-if="errors.message"
      content-center
      class="bg-red-100 p-2 mt-2 text-red-800"
    >
      <strong>Error </strong> <span>{{ errors.message }}</span>
    </div>
  </div>
</template>


<script>
import { ref, reactive, computed } from "@vue/composition-api";
export default {
  props: {
    value: {
      default: () => "",
      type: String || Object
    }
  },
  setup(props, { emit, root }) {
    const upload = ref(null);
    const application = computed(() => root.$store.state.current._id);
    const url = ref(null);
    const errors = reactive({
      code: null,
      message: null
    });

    async function handleUpload() {
      url.value = URL.createObjectURL(upload.value.files[0]);
      const image = new FormData();
      image.append("file", upload.value.files[0]);
      image.append("application", application.value);
      fetch("http://127.0.0.1:3030/files", {
        method: "POST",
        body: image,
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem("feathers-jwt")}`
        }
      })
        .then(response => {
          return response.json();
        })
        .then(data => {
          if (data.errors) {
            errors.code = data.code;
            errors.message = data.message;
            throw new Error(data.message);
          } else {
            emit("input", data.path);
          }
        })
        .catch(err => {
          errors.message = err;
          throw new Error(err);
        });
    }

    return {
      upload,
      handleUpload,
      url,
      errors
    };
  }
};
</script>

