import "vuelidate";
import { Matchers } from "@/plugins/matchMedia";
import { RouterOptions } from "vue-router/types/router";
import { MODALS } from "@/lib/modals/modals";
import { ModalsService } from "@/lib/modals/service";
import { ClientInfo } from "@/lib/clientInfo.service";

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
    $modals: typeof MODALS;
    $openModal<TKey extends MODALS>(
      modal: TKey,
      ...params: Parameters<ModalsService[TKey]>
    ): void;
    $client: ClientInfo;
  }
}

declare module "storybook-vue-router" {
  export default function storyRouterDecorator(
    extend: unknown,
    routerOptions: RouterOptions
  ): Function;
}
