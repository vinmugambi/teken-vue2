<template>
  <div>
    <div class="py-2" v-for="field in fields" :key="field.model">
      <input-label
        v-if="!field.schema"
        :label="field.label"
        :input-id="safeId(field)"
      />
      <component
        :is="field.component"
        v-bind="bindAttrs(field)"
        :id="safeId(field)"
        @change="update(field.model, $event)"
        :value="fieldValue(field)"
        :options="!!field.choices ? field.choices : false"
      />
    </div>
  </div>
</template>

<script lang="js">
import { computed, defineComponent} from "@vue/composition-api";

import inputLabel from "./InputLabel.vue";

export default defineComponent({
  props: {
    schema: { type: Object, required: true },
    value: { type: Object, required: true },
    shared: { type: Object }
  },
  components: { inputLabel },
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

    function fieldValue(field){
       return props.value[field.model];
    }

    function bindAttrs(field) {
      return {...field.attrs}
    }
    // const val = field => {
    //   if (field.schema && !props.value[field.model]) {
    //     return {};
    //   }
    //   return props.value[field.model];
    // };

    function update(property, value) {
      emit("change", {
        [property]: value
      });
    }

    return {
      fields,
      fieldValue,
      bindAttrs,
      update,
      safeId,
    };
  }
});
</script>
