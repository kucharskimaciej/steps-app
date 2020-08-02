import "vuelidate";
import { Matchers } from "@/plugins/matchMedia";

declare module "vuelidate" {
  interface Validation {
    $each?: {
      [index: number]: Validation;
      $iter: Validation;
    };
  }
}

declare module "vue/types/vue" {
  interface Vue {
    $match(matcher: Matchers): boolean;
  }
}
