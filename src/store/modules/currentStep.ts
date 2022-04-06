import { ActionContext } from "vuex";
import { Container } from "typedi";
import { CurrentStepState, RootState, Status, WithStatus } from "@/store/types";
import { convertToStep } from "@/lib/rawStepHelpers";
import { getStoreAccessors } from "typesafe-vuex";
import { StepsResource } from "@/lib/steps.resource";
import { StepDTO } from "../../../common/types/Step";

type CurrentStepContext = ActionContext<CurrentStepState, RootState>;

export const currentStep = {
  namespaced: true,
  state: {
    raw: null,
    status: "clean",
  } as CurrentStepState,
  getters: {
    step(state: CurrentStepState) {
      if (state.raw) {
        return convertToStep(state.raw, null);
      }

      return null;
    },
  },
  mutations: {
    setStep(state: CurrentStepState, payload: StepDTO) {
      state.raw = payload;
    },
    updateStatus(state: WithStatus, payload: Status) {
      state.status = payload;
    },
  },
  actions: {
    async fetch(context: CurrentStepContext, stepId: string) {
      commitUpdateStatus(context, "pending");
      const stepsResource = Container.get(StepsResource);
      const result = await stepsResource.fetch(stepId);
      commitSetStep(context, result);
      commitUpdateStatus(context, "dirty");
    },
  },
};
const { commit, read, dispatch } = getStoreAccessors<
  CurrentStepState,
  RootState
>("currentStep");

const { getters, mutations, actions } = currentStep;

const commitUpdateStatus = commit(mutations.updateStatus);
const commitSetStep = commit(mutations.setStep);

export const getCurrentStep = read(getters.step);

export const dispatchFetchCurrentStep = dispatch(actions.fetch);
