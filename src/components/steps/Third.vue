<template>
  <step-layout>
    <template v-slot:header> </template>
    <template v-slot:title>
      <div v-if="!third.success">
        <h2>Provide an active email</h2>
        <p>
          We use your email to communicate progress and secure your information.
        </p>
      </div>
      <h2 class="" v-else>Verify your email address</h2>
    </template>
    <template v-slot:content>
      <div class="pt-4" v-if="third.success">
        <p class="">
          We have sent a verification email to {{ third.response.email }}.
        </p>
        <h4 class="pt-4">
          Click on the link provided in the email we sent to continue
        </h4>

        <ul class="pt-12 text-sm">
          <li class="flex justify-between border-b border-purple-100 py-2">
            <div>Did not receive the email?</div>
            <div>
              <my-button type="button" @click.once="sendMagicLink">
                Resend
              </my-button>
            </div>
          </li>
          <li class="flex justify-between py-2">
            <div>{{ third.response.email }} is not my email</div>
            <div>
              <my-button @click="third.success=false" type="button">
                Change
              </my-button>
            </div>
          </li>
        </ul>
      </div>
      <validation-observer v-else v-slot="{ invalid }">
        <form @submit.prevent>
          <form-factory
            :value="third.response"
            @input="update($event)"
            :schema="third.schema"
          ></form-factory>

          <license :value="third.response.accept" @input="update($event)" />
          <div class="flex justify-between flex-row-reverse">
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
  </step-layout>
</template>

<script>
import { reactive, set, inject } from "@vue/composition-api";
import { ValidationObserver } from "vee-validate";
import useLocalStorage from "./useLocalStorage.js";

import StepLayout from "./StepLayout.vue";
import MyButton from "../navigation/Button.vue";
import FormFactory from "../form/FormFactory.vue";

import License from "../form/License.vue";

const keys = ["passport", "duration", "nationality", "visaPurpose", "visaType"];
const visa = () => {
  let choice = {};

  keys.forEach(key => {
    return (choice[key] = useLocalStorage.get(key));
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
      loading: null,
      error: null,
      success: false
    });

    const Feathers = inject("feathers");

    function update(field) {
      let property = Object.keys(field)[0];
      set(third.response, property, field[property]);
    }

    async function sendMagicLink() {
      third.loading = true;
      third.error = null;

      const authenticate = Feathers.service("authentication");
      try {
        await authenticate.create({
          action: "sendMagicLink",
          email: third.response.email,
          visa: visa()
        });
        third.success = true;
      } catch (error) {
        third.error = error;
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
    component: "text",
    attrs: { placeholder: "jdoe@example.com", type: "email" },
    label: "Email address",
    validation: "required|email"
  }
};
</script>