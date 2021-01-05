<script lang="ts">
import { Vue, Component, InjectReactive, Prop } from "vue-property-decorator";
import { Validation } from "vuelidate";

@Component
export default class ValidationHint extends Vue {
  @Prop() private validation!: Validation;

  @InjectReactive({ from: "hasError", default: false }) hasError!: boolean;

  get isRequired() {
    return "required" in this.validation;
  }

  customError(validator: string): boolean {
    return validator in this.validation && !(this.validation as any)[validator];
  }
}
</script>

<template>
  <aside class="inline ml-1">
    <span v-if="isRequired">*</span>

    <span
      v-if="validation.$anyError"
      class="ml-2 text-2xs uppercase tracking-wider font-medium"
    >
      <span v-if="customError('required')">
        Required
      </span>

      <span v-else-if="customError('duplicate')">
        Duplicate
      </span>

      <span v-else>
        Invalid
      </span>
    </span>
  </aside>
</template>
