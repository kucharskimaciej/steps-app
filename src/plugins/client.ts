import { Container } from "typedi";
import { ClientInfo } from "@/lib/clientInfo.service";
import { Plugin } from "vue";

const ClientPlugin: Plugin = (app) => {
  app.config.globalProperties.$client = Container.get(ClientInfo);
};

export default ClientPlugin;
