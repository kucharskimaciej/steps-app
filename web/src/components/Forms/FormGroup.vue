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

  @ProvideReactive("hasError") get hasError() {
    return this.invalid || (this.validation && this.validation.$anyError);
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
    <label class="block ml-3 mb-1 text-sm font-bold "
      >{{ label
      }}<ValidationHint :validation="validation" v-if="label && validation"
    /></label>
    <main class="mb-1">
      <slot></slot>
    </main>

    <footer class="pl-3 text-2xs">
      <slot name="help"></slot>
    </footer>
  </section>
</template>
