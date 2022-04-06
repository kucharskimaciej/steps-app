import { Store, createStore, useStore as originalUseStore } from "vuex";
import { RootState } from "@/store/types";
import { auth } from "@/store/modules/auth";
import { steps } from "@/store/modules/steps";
import { currentStep } from "@/store/modules/currentStep";
import { practiceSessions } from "@/store/modules/practiceSessions";
import { selectedSession } from "@/store/modules/selectedSession";
import { inlineEdit } from "@/store/modules/inlineEdit";
import { feed } from "@/store/modules/feed";

let store: Store<RootState>;

export function provideStore(): Store<RootState> {
  if (!store) {
    store = createStore<RootState>({
      modules: {
        auth,
        steps,
        feed,
        currentStep,
        practiceSessions,
        selectedSession,
        inlineEdit,
      },
    });
  }

  return store;
}

export function useStore() {
  return originalUseStore();
}
