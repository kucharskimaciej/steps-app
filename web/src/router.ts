import Vue from "vue";
import Router from "vue-router";
import CreateStep from "@/views/CreateStep/CreateStep.vue";
import Steps from "@/views/Steps/Steps.vue";
import EditStep from "@/views/EditStep/EditStep.vue";
import { ROUTES } from "@/routes";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      name: ROUTES.STEP_LIST,
      path: "/",
      component: Steps
    },
    {
      name: ROUTES.CREATE_STEP,
      path: "/create-step",
      component: CreateStep
    },
    {
      name: ROUTES.EDIT_STEP,
      path: "/edit/:stepId",
      component: EditStep
    }
  ]
});
