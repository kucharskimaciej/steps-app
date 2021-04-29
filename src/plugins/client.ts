import Vue from "vue";
import { Container } from "vue-typedi";
import { ClientInfo } from "@/lib/clientInfo.service";

export default function ClientPlugin() {
  Vue.prototype.$client = Container.get(ClientInfo);
}
