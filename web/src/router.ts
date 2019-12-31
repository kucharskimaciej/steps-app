import Vue from "vue";
import Router from "vue-router";
import CreateStep from "@/views/CreateStep/CreateStep.vue";
import Steps from "@/views/Steps/Steps.vue";
import EditStep from "@/views/EditStep/EditStep.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      component: Steps
    },
    {
      path: "/create-step",
      component: CreateStep
    },
    {
      path: "/edit/:stepId",
      component: EditStep
    }
  ]
});
