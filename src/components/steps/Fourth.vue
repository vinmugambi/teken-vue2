<template>
  <step-layout>
    <template v-slot:title>
      <div v-if="applications">
        <h2>
          You have {{ Object.keys(applications).length }} incomplete
          applications
        </h2>

        We found incomplete applications that are associated with your email
        address.
        <h4 class="pt-2">Select the one you wish to continue with</h4>
      </div>
    </template>
    <template v-slot:full>
      <ul v-if="applications">
        <li
          class="flex flex-no-wrap justify-between py-2 px-4 border-b hover:bg-purple-100"
          v-for="visa in applications"
          :key="visa._id"
          @click="setCurrent(visa)"
        >
          <div>
            <div class="leading-tight">
              {{ visa.visaType }} - {{ visa.duration }}
              {{ visa.duration === "one" ? "month" : "months" }}
            </div>
            <div class="text-xs text-gray-600 leading-tight">
              Started 5 hours ago
            </div>
          </div>
          <div class="static flex items-center z-10 ">
            <button type="button" class="p-1 bg-purple-200 hover:bg-red-500">
              discard
            </button>
          </div>
        </li>
      </ul>
    </template>
    <template v-slot:content>
      <span v-if="applications" class="text-xs"
        >All incomplete applications will be discarded in 14 days
        <a href="#">learn more</a></span
      >
      <pre>{{ current }}</pre>
    </template>
  </step-layout>
</template>

<script>
import {
  inject,
  computed,
  onBeforeMount,
  watchEffect
} from "@vue/composition-api";
import StepLayout from "./StepLayout";

export default {
  components: { StepLayout },
  setup(props, { root }) {
    const applications = computed(() => root.$store.state.others);
    const feathers = inject("feathers");
    const current = computed(() => root.$store.state.current);

    function setCurrent(visa) {
      root.$store.commit("patch", { current: visa });
    }
    onBeforeMount(async () => {
      let india = await feathers
        .service("visa")
        .find()
        .catch(err => {
          root.$store.commit("patch", { error: err.message });
        });

      if (india) {
        switch (india.data.length) {
          case 0:
            root.$store.commit("patch", {
              error: "No applications were found"
            });

            break;
          case 1:
            root.$store.commit("patch", { current: india.data[0] });

            break;
          default:
            root.$store.commit("patch", { others: india.data });
        }
      }
    });
    watchEffect(() => console.log(root.$store.state));
    return {
      applications,
      setCurrent,
      current
    };
  }
};
</script>