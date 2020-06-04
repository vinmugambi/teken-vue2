<template>
  <step-layout>
    <template v-slot:header>
      <div
        v-for="(tab, index) in tabs.tabList"
        :key="tab.text+index"
        :class="
          index === tabs.activeTabIndex
            ? 'bg-white border-primary-400 border-t-2'
            : 'bg-gray-200 border-transparent border-t-2'
        "
        class="h-10 flex-1 flex justify-center items-center cursor-pointer font-semibold"
        @click="tabs.activeTabIndex = index"
      >
        {{ tab.text }}
      </div>
    </template>

    <template v-slot:title>
      <h1>Apply for Indian e-visa</h1>
    </template>

    <template v-slot:content>
        <p class="py-2">To start a new application, click begin</p>
        <my-button variant="primary" @click="$emit('next')">Begin</my-button>
    </template>
  </step-layout>
</template>

<script>
import { reactive } from "@vue/composition-api";

import StepLayout from "./StepLayout";

import MyButton from '../navigation/Button.vue'


export default {
  components: {MyButton,StepLayout},
  setup() {
    const tabs = reactive({
      tabList: [{ text: "Apply" }, { text: "Check status" }],
      activeTabIndex: 0
    });
    return {
      tabs
    };
  }
};
</script>