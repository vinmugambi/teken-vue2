<template>
  <div class="pt-1">
    <div class="h-auto w-full pb-2">
      <img v-if="url && !uploading" :src="url" class="border" alt="" />
      <div v-if="uploading" class="p-4">
        uploading
      </div>
    </div>
    <label
      for="upload-image"
      class="inline-block px-2 py-1 bg-primary-800 cursor-pointer rounded text-white font-bold"
      >{{ url && !uploading? "change" : "upload" }}</label
    >
    <input
      type="file"
      ref="upload"
      class="block opacity-0 h-0"
      id="upload-image"
      accept=".jpg,.png,.pdf,.jpg"
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
  setup(props, { emit, root, attrs}) {
    const upload = ref(null);
    const pdf = ref(false);
    const uploading = ref(null);

    const application = computed(() => root.$store.state.current._id);
    const url = computed({
      get() {
        return root.$store.state.current[attrs.name] || null;
      },
      set(value) {
        emit("input", value);
      }
    });
    const errors = reactive({
      code: null,
      message: null
    });

    const isPdf = ref(null);

    async function uploadToServer(file) {
      const image = new FormData();
      image.append("file", file);
      image.append("application", application.value);
      let server = process.env.VUE_APP_API_URL;
      fetch(server + "/files", {
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
            if (!isPdf.value) {
              url.value = server + "/uploads/" + data.filename;
            } else {
              url.value =
                server +
                "/uploads/" +
                data.filename.substring(0, data.filename.length - 4) +
                "-0.png";
              isPdf.value = false;
              uploading.value = false;
            }
          }
        })
        .catch(err => {
          errors.message = err;
          throw new Error(err);
        });
    }

    async function handleUpload() {
      errors.message = null;
      const file = upload.value.files[0];

      if (
        ["image/jpeg", "image/jpg", "image/png", "application/pdf"].includes(
          file.type
        )
      ) {
        url.value = URL.createObjectURL(file);
        if (file.type === "application/pdf") {
          isPdf.value = true;
          uploading.value = true;
        } else {
          isPdf.value = false;
        }
        uploadToServer(file);
      } else {
        errors.message = "Only still images and pdf allowed";
      }
    }

    return {
      upload,
      handleUpload,
      url,
      errors,
      pdf,
      isPdf,
      uploading
    };
  }
};
</script>

