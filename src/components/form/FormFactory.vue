<template>
  <form submit.prevent>
    <div class="py-2" v-for="field in fields" :key="field.model">
      <Validate :rules="field.validation" v-slot="{ errors }" :name="field.label">
        <div
          :class="
            errors.length > 0
              ? 'pl-2 -ml-2 border-l-2 border-red-400 rounded'
              : ''
          "
        >
          <input-label v-if="field.label" :label="field.label" :input-id="safeId(field)" />
          <p v-if="field.help" class="text-xs text-gray-600">
            {{field.help}}
          </p>
          <component
            :is="field.component"
            :error="true ? errors.length > 0 : false"
            v-bind="bindAttrs(field)"
            :id="safeId(field)"
            @input="update(field.model, $event)"
            :value="value[field.model]"
            :options="!!field.choices ? field.choices : null"
          />
          <span class="block h-4 text-xs text-red-700">{{ errors[0] }}</span>
        </div>
      </Validate>
    </div>
  </form>
</template>

<script lang="js">
import { computed, defineComponent} from "@vue/composition-api";
import { ValidationProvider as Validate, extend } from 'vee-validate';
import { required, between,email } from "vee-validate/dist/rules";

import inputLabel from "./InputLabel.vue";

extend('required', {
  ...required,
  message: '{_field_} is required'
});
extend('between', {
  ...between,
  message: `{_field_} should be between {min} and {max}`
})
extend('email', {
  ...email,
  message: 'Input a valid email address'
});

export default defineComponent({
  props: {
    schema: { type: Object, required: true },
    value: { type: Object, required: true },
    shared: { type: Object }
  },
  components: { inputLabel, Validate},
  setup(props, { emit }) {
   const fields = computed(() => {
      let fields = [];
      for (let model in props.schema) {
        fields.push({ ...props.schema[model], model });
      }
      return fields;
    });

    function safeId(field){
      return field.model.replace(/\s+/g, "-");
    }

    function bindAttrs(field) {
      return {...field.attrs, name: [field.model]}
    }

    function update(property, value) {
      emit("input", {
        [property]: value
      });
    }

    return {
      fields,
      bindAttrs,
      update,
      safeId,
    };
  }
});
</script>
