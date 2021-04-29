import Vue from "vue";
import Router from "vue-router";
import router from "./router";
import { authenticate } from "@/router/authenticate.guard";

Vue.use(Router);
router.beforeEach(authenticate);

export default router;
export * from "@/router/routes";
