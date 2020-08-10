import Vuex, { Store } from "vuex";
import { RootState } from "@/store/types";
import { auth } from "@/store/modules/auth";
import { steps } from "@/store/modules/steps";
import { currentStep } from "@/store/modules/currentStep";
import { practiceSessions } from "@/store/modules/practiceSessions";

let store: Store<RootState>;
export function provideStore() {
  if (!store) {
    store = new Vuex.Store<RootState>({
      modules: {
        auth,
        steps,
        currentStep,
        practiceSessions
      }
    });
  }

  return store;
}
