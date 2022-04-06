import { Matchers } from "@/plugins/matchMedia";
import { RouterOptions } from "vue-router/types/router";
import { MODAL_STYLE } from "@/lib/modals/modals";
import { ClientInfo } from "@/lib/clientInfo.service";
import { ROUTES } from "@/router";
import { Router } from "vue-router";

declare module "@vue/runtime-core" {
  interface ComponentCustomProperties {
    $router: Router;
    $match(matcher: Matchers): boolean;
    $modalStyle: typeof MODAL_STYLE;
    $client: ClientInfo;
    $routes: typeof ROUTES;
    $filters: Record<string, any>;
  }
}

declare module "storybook-vue-router" {
  export default function storyRouterDecorator(
    extend: unknown,
    routerOptions: RouterOptions
  ): any;
}

export {};
