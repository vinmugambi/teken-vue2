<template>
  <div class="pt-1">
    <div class="h-auto w-full pb-2">
      <img v-if="url && !isPdf" :src="url" class="border" alt="" />
      <canvas v-if="isPdf" id="pdf-preview" ref="pdf">
        pdf file
      </canvas>
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
import { ref, reactive, computed, watchEffect } from "@vue/composition-api";
export default {
  props: {
    value: {
      default: () => "",
      type: String || Object
    }
  },
  setup(props, { emit, root }) {
    const upload = ref(null);
    const pdf = ref(false);

    const application = computed(() => root.$store.state.current._id);
    const url = computed({
      get() {
        return root.$store.state.current.passportImage || null;
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
            url.value = server + "/uploads/" + data.filename;
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
          const loadingTask = pdfjsLib.getDocument(url.value);
          loadingTask.promise.then(pdfFile => {
            pdfFile.getPage(1).then(page => {
              console.log(page);
              let viewport = page.getViewport({ scale: 0.7 });

              let ctx = pdf.value.getContext("2d");
              pdf.value.height = viewport.height;
              pdf.value.width = viewport.width;

              let renderContext = {
                canvasContext: ctx,
                viewport: viewport
              };

              page.render(renderContext);
            });
          });
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
      isPdf
    };
  }
};
</script>

