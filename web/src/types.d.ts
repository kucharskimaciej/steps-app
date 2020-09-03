import "vuelidate";
import { Matchers } from "@/plugins/matchMedia";
import { RouterOptions } from "vue-router/types/router";

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

declare module "storybook-vue-router" {
  export default function storyRouterDecorator(
    extend: unknown,
    routerOptions: RouterOptions
  ): Function;
}
