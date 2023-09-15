<script lang="ts">
import { computed, defineComponent, provide } from "vue";
import ValidationHint from "@/components/Forms/ValidationHint.vue";
import { useField } from "vee-validate";

const FormGroup = defineComponent({
  components: { ValidationHint },
  props: {
    name: {
      type: String,
      required: true,
    },
    label: String,
    invalid: Boolean,
  },
  setup(props) {
    const field = useField(() => props.name);
    const hasError = computed(
      () => props.invalid || (field.meta.touched && !field.meta.valid)
    );

    provide("hasError", hasError.value);

    return {
      hasError,
      field,
    };
  },
});

export default FormGroup;
</script>

<template>
  <section
    class="mb-5"
    :class="{
      'text-gray-700': !hasError,
      'text-red-lighter': hasError,
    }"
  >
    <label class="block ml-3 mb-1 text-sm font-bold">
      {{ label }}
      <ValidationHint v-if="label" :field="field" />
    </label>
    <main class="mb-1">
      <slot />
    </main>

    <footer class="pl-3 text-2xs">
      <slot name="help" />
    </footer>
  </section>
</template>
