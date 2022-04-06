<script lang="ts">
import { computed, defineComponent, inject, PropType } from "vue";
import type { Validation } from "@vuelidate/core";

const ValidationHint = defineComponent({
  components: {},
  props: {
    validation: Object as PropType<Validation>,
  },
  setup(props) {
    const hasError = inject<boolean>("hasError", false);
    const isRequired = computed(() =>
      Boolean(props.validation && "required" in props.validation)
    );

    function customError(validator: string): boolean {
      return Boolean(
        props.validation &&
          validator in props.validation &&
          !(props.validation as any)[validator]
      );
    }

    return {
      hasError,
      customError,
      isRequired,
    };
  },
});

export default ValidationHint;
</script>

<template>
  <aside class="inline ml-1">
    <span v-if="isRequired">*</span>

    <span
      v-if="validation.$anyError"
      class="ml-2 text-2xs uppercase tracking-wider font-medium"
    >
      <span v-if="customError('required')"> Required </span>

      <span v-else-if="customError('duplicate')"> Duplicate </span>

      <span v-else> Invalid </span>
    </span>
  </aside>
</template>
