<script lang="ts">
import { computed, defineComponent, PropType } from "vue";
import { FieldContext } from "vee-validate";

const ValidationHint = defineComponent({
  components: {},
  props: {
    field: {
      type: Object as PropType<FieldContext>,
      required: true,
    },
  },
  setup(props) {
    const hasError = computed(
      () =>
        (props.field.meta.touched || props.field.meta.dirty) &&
        !props.field.meta.valid
    );

    function customError(validator: string): boolean {
      return props.field.errors.value.includes(validator);
    }

    return {
      hasError,
      customError,
    };
  },
});

export default ValidationHint;
</script>

<template>
  <aside class="inline ml-1">
    <!--    <span v-if="isRequired">*</span>-->

    <span
      v-if="hasError"
      class="ml-2 text-2xs uppercase tracking-wider font-medium"
    >
      <span v-if="customError('required')"> Required </span>
      <span v-else-if="customError('duplicate')"> Duplicate </span>
      <span v-else> Invalid </span>
    </span>
  </aside>
</template>
