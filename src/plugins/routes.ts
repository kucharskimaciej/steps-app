import Vue from "vue";
import { ROUTES } from "@/router";

export default function RoutesPlugin() {
  Vue.prototype.$routes = ROUTES;
}
