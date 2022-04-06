<script lang="ts">
import { computed, defineComponent, provide } from "vue";
import type { PropType } from "vue";
import ValidationHint from "@/components/Forms/ValidationHint.vue";
import type { Validation } from "@vuelidate/core";

const FormGroup = defineComponent({
  components: { ValidationHint },
  props: {
    label: String,
    invalid: Boolean,
    validation: Object as PropType<Validation>,
  },
  setup(props) {
    const hasError = computed(
      () => props.invalid || !!props.validation?.$error
    );

    provide("hasError", hasError);
    provide("validation", props.validation);

    return {
      hasError,
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
      <ValidationHint v-if="label && validation" :validation="validation" />
    </label>
    <main class="mb-1">
      <slot />
    </main>

    <footer class="pl-3 text-2xs">
      <slot name="help" />
    </footer>
  </section>
</template>
