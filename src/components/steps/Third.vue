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
      <validation-observer v-slot="{ invalid }">
        <form @submit.prevent>
          <form-factory
            :value="third.response"
            @input="update($event)"
            :schema="third.schema"
          ></form-factory>

          <license :value="third.response.accept" @input="update($event)" />
          <div class="flex justify-between pt-4 flex-row-reverse">
            <my-button
              :disabled="invalid"
              variant="primary"
              @click="sendMagicLink"
              >Next</my-button
            >
            <my-button @click="$emit('back')">Back</my-button>
          </div>
        </form>
      </validation-observer>
    </template>
    <template v-slot:navigation> </template>
  </step-layout>
</template>

<script>
import { reactive, set, inject } from "@vue/composition-api";
import { ValidationObserver } from "vee-validate";
import useLocalStorage from "./useLocalStorage.js";

import StepLayout from "./StepLayout.vue";
import MyButton from "../navigation/Button.vue";
import FormFactory from "../form/FormFactory.vue";

import TextInput from "../form/TextInput.vue";
import License from "../form/License.vue";

const keys = ["passport", "duration", "nationality", "visaPurpose", "visaType"];
const visa = () => {
  let choice = {};
  useLocalStorage.get("passport");
  keys.forEach(key => {
    visa[key] = useLocalStorage.get(key);
  });
  return choice;
};

export default {
  components: {
    StepLayout,
    MyButton,
    FormFactory,
    License,
    ValidationObserver
  },
  setup() {
    const third = reactive({
      response: {
        email: null,
        accept: "no"
      },
      schema: SCHEMA,
      loading: null
    });

    const Feathers = inject("feathers");

    function update(field) {
      let property = Object.keys(field)[0];
      set(third.response, property, field[property]);
    }

    async function sendMagicLink() {
      third.loading = true;

      const authenticate = Feathers.service("authentication");
      try {
        // const res=await fetch("http://localhost:3030/authentication", {
        //   method: "POST",
        //   headers: {
        //     "Content-Type": "application/json"
        //   },
        //   body: JSON.stringify({
        //     action: "sendMagicLink",
        //     email: third.response.email
        //   })
        // });
        // console.log(res);
        console.log(visa());
        // await authenticate.create({
        //   action: "sendMagicLink",
        //   email: third.response.email,
        //   type: "first",
        //   visa
        // });
      } catch (error) {
        console.error(error);
      } finally {
        third.loading = false;
      }
    }

    return {
      third,
      update,
      sendMagicLink
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