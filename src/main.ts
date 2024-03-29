import "reflect-metadata";
import { createApp } from "vue";
import { provideStore } from "@/store";
import "./main.css";
import router from "./router";
import "../common/config";
import "vue-virtual-scroller/dist/vue-virtual-scroller.css";
import App from "./App.vue";
import {
  DateFilter,
  FullDateFilter,
  ShortLinkFilter,
  SmartDateFilter,
} from "@/filters";
import ClientPlugin from "@/plugins/client";
import MatchMediaPlugin from "@/plugins/matchMedia";
import RoutesPlugin from "@/plugins/routes";
import ModalsPlugin from "@/plugins/modals";

// register services that are only available via token
import "@/lib/stepsByHashDuplicateLocator";
import "@/lib/videoUpload.service";
import "@/lib/firebase/storage.service";

const store = provideStore();
const app = createApp(App, {
  store,
});

app.use(store);
app.use(router);
app.config.globalProperties.$filters = {
  shortLink: ShortLinkFilter,
  date: DateFilter,
  fullDate: FullDateFilter,
  smartDate: SmartDateFilter,
};

app.use(MatchMediaPlugin);
app.use(ClientPlugin);
app.use(RoutesPlugin);
app.use(ModalsPlugin);

app.mount("#app");

// import "./registerServiceWorker";
