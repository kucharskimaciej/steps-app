import "vuelidate";
import { Matchers } from "@/plugins/matchMedia";
import { RouterOptions } from "vue-router/types/router";
import { MODAL_STYLE } from "@/lib/modals/modals";
import { ClientInfo } from "@/lib/clientInfo.service";
import { ROUTES } from "@/router";

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
    $modalStyle: typeof MODAL_STYLE;
    $client: ClientInfo;
    $routes: typeof ROUTES;
  }
}

declare module "storybook-vue-router" {
  export default function storyRouterDecorator(
    extend: unknown,
    routerOptions: RouterOptions
  ): any;
}
