<template>
  <div class="max-w-sm mx-auto pt-16">
    <h2 v-if="status.loading">Verifying ...</h2>
    <div class="p-4 bg-red-100" v-if="status.error">
      <h2 class="text-lg font-bold">{{status.error.title}}</h2>
      {{ status.error.message }}
    </div>
  </div>
</template>
<script>
import { computed, onMounted, reactive, inject } from "@vue/composition-api";
import { provideFeathers } from "./../feathers";
export default {
  setup(props, { root }) {
    provideFeathers();
    const authRequest = computed(() => {
      let { acc, token } = root.$route.query;
      return { email: acc, magic: token, strategy: "link" };
    });
    const status = reactive({
      loading: null,
      error: null
    });
    const feathers = inject("feathers");

    onMounted(async () => {
      status.loading = true;
      const login = await feathers
        .authenticate(authRequest.value)
        .catch(err => {
          switch (err.code) {
            case 401:
              status.error = {
                message: "The link you clicked is expired or has bee clicked more than once. Please request a new one.",
                title: "Link is invalid"
              };
              break;
            default: {
              status.error = {
                message: "Unexpected server error. Please try again later",
                title: "Server error"
              };
            }
          }
          console.log(err);
          status.loading = false;
        });
      if (login) root.$router.push("/visa");
    });

    return {
      authRequest,
      status
    };
  }
};
</script>
