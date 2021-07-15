import Vuex, { Store } from "vuex";
import { RootState } from "@/store/types";
import { auth } from "@/store/modules/auth";
import { steps } from "@/store/modules/steps";
import { currentStep } from "@/store/modules/currentStep";
import { practiceSessions } from "@/store/modules/practiceSessions";
import { selectedSession } from "@/store/modules/selectedSession";
import { uiModals } from "@/store/modules/uiModals";
import { uiCurrentVideo } from "@/store/modules/uiCurrentVideo";
import { feed } from "@/store/modules/feed";

let store: Store<RootState>;

export function provideStore(): Store<RootState> {
  if (!store) {
    store = new Vuex.Store<RootState>({
      modules: {
        auth,
        steps,
        feed,
        currentStep,
        practiceSessions,
        selectedSession,
        uiModals,
        uiCurrentVideo
      }
    });
  }

  return store;
}
