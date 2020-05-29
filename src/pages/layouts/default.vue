<template>
  <div class="min-h-screen relative bg-gray-100">
    <navigation />
    <main class="container mx-auto">
      <router-view />
    </main>
    <my-footer />
  </div>
</template>

<script>
import Navigation from "../../components/navigation/Nav.vue";
import MyFooter from "../../components/navigation/Footer.vue";

export default {
  name: "App",
  components: {
    Navigation,
    MyFooter
  }
};
</script>
