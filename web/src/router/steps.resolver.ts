import { NavigationGuard } from "vue-router";
import { dispatchFetchAllSteps, provideStore } from "@/store";

export const fetchAllSteps: NavigationGuard = async (_to, _from, next) => {
  await dispatchFetchAllSteps(provideStore());
  next();
};
