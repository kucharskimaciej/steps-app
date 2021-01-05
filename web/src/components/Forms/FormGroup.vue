<script lang="ts">
import { Vue, Component, Prop, ProvideReactive } from "vue-property-decorator";
import { Validation } from "vuelidate";
import ValidationHint from "@/components/Forms/ValidationHint.vue";

@Component({
  components: { ValidationHint },
  inject: []
})
export default class FormGroup extends Vue {
  @Prop() private label!: string;
  @Prop() private invalid!: boolean;
  @Prop() private validation!: Validation;

  @ProvideReactive("hasError") get hasError(): boolean {
    return this.invalid || (this.validation && this.validation.$anyError);
  }

  @ProvideReactive("validation") get validationProvider(): Validation {
    return this.validation;
  }
}
</script>

<template>
  <section
    class="mb-5"
    :class="{
      'text-gray-700': !hasError,
      'text-red-lighter': hasError
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
