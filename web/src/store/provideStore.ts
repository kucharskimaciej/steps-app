import Vuex, { Store } from "vuex";
import { RootState } from "@/store/types";
import { auth } from "@/store/modules/auth";
import { steps } from "@/store/modules/steps";
import { currentUser } from "@/store/modules/currentUser";
import { currentStep } from "@/store/modules/currentStep";

let store: Store<RootState>;
export function provideStore() {
  if (!store) {
    store = new Vuex.Store<RootState>({
      modules: {
        auth,
        steps,
        currentUser,
        currentStep
      }
    });
  }

  return store;
}