<template>
  <step-layout>
    <template v-slot:header> </template>
    <template v-slot:title>
      <h2>Provide an active email</h2>
      <p class="px-1 text-gray-600">
        We use your email to communicate progress and secure your information.
      </p>
    </template>
    <template v-slot:content>
      <form-factory
        :value="third.response"
        @input="update($event)"
        :schema="third.schema"
      ></form-factory>

      <license :value="third.response.accept" @input="update($event)" />
    </template>
    <template v-slot:navigation>
      <div class="flex justify-between pt-4 flex-row-reverse">
        <my-button
          :disabled="!isComplete"
          variant="primary"
          @click="$emit('next')"
          >Next</my-button
        >
        <my-button @click="$emit('back')">Back</my-button>
      </div>
    </template>
  </step-layout>
</template>

<script>
import { ref, reactive,set } from "@vue/composition-api";

import StepLayout from "./StepLayout.vue";
import MyButton from "../navigation/Button.vue";
import FormFactory from "../form/FormFactory.vue";

import TextInput from "../form/TextInput.vue";
import License from "../form/License.vue";

export default {
  components: { StepLayout, MyButton, FormFactory, License },
  setup() {
    const isComplete = ref(false);
    const third = reactive({
      response: {
        email: null,
        accept: "no"
      },
      schema: SCHEMA
    });

    function update(field) {
      let property = Object.keys(field)[0];
      set(third.response, property, field[property]);
    }

    return {
      isComplete,
      third,
      update
    };
  }
};

const SCHEMA = {
  email: {
    component: TextInput,
    attrs: { placeholder: "jdoe@example.com", type: "email" },
    label: "Email address",
    validation: "required|email"
  }
  // accept: {
  //   component: CheckBox,
  //   label: "Licence agreement",
  //   validation: "required",
  //   help: "I have read the <a href='#'>End-user licence agreement</a>  and Privacy policy",
  //   choices: [
  //     { text: "I accept licence agreement and privacy policy", value: true }
  //   ]
  // }
};
</script>