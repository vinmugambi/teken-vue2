<template>
  <step-layout>
    <template v-slot:title>
      <div v-if="applications">
        <h2>You have {{ total }} incomplete applications</h2>
        <p>
          We found incomplete applications that are associated with your email
          address.
        </p>
        <h4 class="pt-2">Select the one you wish to continue with</h4>
      </div>
    </template>
    <template v-slot:full>
      <ul v-if="applications">
        <li
          class="flex flex-no-wrap justify-between py-2 px-4 cursor-pointer border-b border-purple-100 hover:bg-purple-100"
          v-for="visa in applications"
          :key="visa._id"
          @click="setCurrent(visa)"
        >
          <div>
            <div class="leading-tight">
              {{ visa.duration }}
              {{ visa.duration === "one" ? "month" : "months" }}
              {{ visa.visaType }} visa
            </div>
            <div class="text-xs text-gray-600 leading-tight">
              <span v-if="current && visa._id === current._id" class="inline-block h-2 w-2 mr-1 rounded-full bg-green-500"></span>
              <span>
                Started 5 hours ago
              </span>
            </div>
          </div>
          <div class="static flex items-center z-10 ">
            <button
              @click.stop.once="discard(visa._id)"
              type="button"
              class="p-1 rounded bg-purple-100 hover:bg-red-500"
            >
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
    </template>
  </step-layout>
</template>

<script>
import { computed } from "@vue/composition-api";
import StepLayout from "./StepLayout.vue";

export default {
  components: { StepLayout },
  setup(props, { root, emit }) {
    const Store = root.$store;
    const applications = computed(() => Store.state.applications);
    const current = computed(() => Store.state.current);
    const total = computed(() => Store.state.totalApplications);
    function setCurrent(visa) {
      emit('next');
      Store.commit("patch", { current: visa });
    }
    function discard(id) {
      Store.dispatch("discard", id);
    }

    return {
      applications,
      setCurrent,
      current,
      total,
      discard
    };
  }
};
</script>