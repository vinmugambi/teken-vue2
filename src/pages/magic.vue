<template>
  <div class="max-w-sm mx-auto pt-16">
    <h2>Login in you in ...</h2>
    <pre>{{ authRequest }}</pre>
  </div>
</template>
<script>
import { computed, onMounted } from "@vue/composition-api";
import { provideFeathers, Feathers } from "./../feathers";
export default {
  setup(props, { root }) {
    provideFeathers();
    const authRequest = computed(() => {
      let { acc, token } = root.$route.query;
      return { email: acc, magic: token, strategy: "link" };
    });
    const feathers = Feathers();

    onMounted(async () => {
      try {
        feathers.reAuthenticate();
      } catch (error) {
        feathers.authenticate(this.authRequest).catch(err => {
          throw new Error(err);
        });
      } finally {
        root.$router.push("/visa");
      }
    });

    return {
      authRequest
    };
  }
};
</script>
