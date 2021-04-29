import Router from "vue-router";
import { ROUTES } from "@/router/routes";
import CreateStep from "@/views/CreateStep/CreateStep.vue";
import Steps from "@/views/Steps/Steps.vue";
import FeedView from "@/views/Feed/FeedView.vue";
import PublicStep from "@/views/PublicStep/PublicStep.vue";
import SessionsView from "@/views/Sessions/SessionsView.vue";
import SessionView from "@/views/Session/SessionView.vue";
import EditStep from "@/views/EditStep/EditStep.vue";
import HistoricalSessionView from "@/views/HistoricalSession/HistoricalSessionView.vue";

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      redirect: "/feed"
    },
    {
      name: ROUTES.STEP_LIST,
      path: "/list",
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
    },
    {
      name: ROUTES.FEED,
      path: "/feed",
      component: FeedView
    },
    {
      name: ROUTES.PUBLIC_STEP,
      path: "/s/:stepId",
      component: PublicStep,
      meta: {
        public: true
      },
      props: true
    },
    {
      name: ROUTES.SESSIONS,
      path: "/sessions",
      component: SessionsView
    },
    {
      name: ROUTES.SESSION,
      path: "/sessions/:sessionId",
      component: SessionView,
      props: true
    },
    {
      name: ROUTES.HISTORICAL_SESSION,
      path: "/historical-sessions/:sessionDate",
      component: HistoricalSessionView,
      props: true
    }
  ]
});
