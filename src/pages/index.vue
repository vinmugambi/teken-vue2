<template>
  <step>
    <template v-slot:header>
      <div
        v-for="(tab, index) in tabs.tabList"
        :key="tab.text"
        :class="
          index === tabs.activeTabIndex
            ? 'bg-white border-blue-600 border-t-2'
            : 'bg-gray-200 border-transparent border-t-2'
        "
        class="h-10 flex-1 flex justify-center items-center cursor-pointer font-semibold"
        @click="tabs.activeTabIndex = index"
      >
        {{ tab.text }}
      </div>
    </template>

    <template v-slot:title>
      <h1>Apply for Indian visa</h1>
    </template>

    <template v-slot:content>
      <div v-if="activeStep === 0">
        <p class="py-2">To start a new application, click begin</p>
        <my-button variant="primary" @click="nextStep">Begin</my-button>
      </div>
      <div v-else>
        <form-factory :schema="schema" :value="formData" @change="update($event)" />
        <pre>
          {{ formData }}
        </pre>
      </div>
    </template>
  </step>
</template>


<script lang="js">
import { reactive, ref, set} from '@vue/composition-api'

import MyButton from '../components/navigation/Button.vue'
import FormFactory from '../components/form/FormFactory.vue'
import TextInput from '../components/form/TextInput.vue'
import Step from '../components/Step.vue'

export default {
  components: { MyButton, FormFactory, Step },
  setup() {
    const tabs = reactive({
      tabList: [{ text: 'Apply' }, { text: 'Check status' }],
      activeTabIndex: 0
    })
    const formData = reactive({})
    const schema = reactive(SCHEMA)
    const activeStep = ref(0);
    function nextStep() {
        activeStep.value++
    }
    function update(field) {
      console.log(field)
      let property = Object.keys(field)[0]
      set(formData, property, field[property])
    }
    return {
      tabs,
      schema,
      formData,
      nextStep,
      activeStep,
      update
    }
  }
}

const SCHEMA = {
  passport: {
    label: 'Passport type',
    component: TextInput
  },
  nationality: {
    label: 'Nationality',
    component: TextInput
  },
  visaType: { label: 'Visa type', component: TextInput },
  visaPurpose: {label: 'Purpose of travel',component: TextInput}
}
</script>
