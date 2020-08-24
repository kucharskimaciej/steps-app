import { RootState, Status, StepsState } from "@/store/types";
import { RawStep } from "../../../../common/types/Step";
import { Container } from "vue-typedi";
import {
  CreateParams,
  StepsResource,
  UpdateParams
} from "@/lib/steps.resource";
import { orderBy, uniq, maxBy, keyBy, groupBy, partial } from "lodash";
import { convertToStep } from "@/lib/rawStepHelpers";
import { ActionContext } from "vuex";
import { provideStore } from "@/store";
import { getStoreAccessors } from "typesafe-vuex";

type StepsContext = ActionContext<StepsState, RootState>;

export const steps = {
  namespaced: true,
  state: {
    rawSteps: [],
    status: "clean"
  },
  getters: {
    getVariationsByKey(state: StepsState): Record<string, RawStep[]> {
      return groupBy(state.rawSteps, "variationKey");
    },
    getSteps(state: StepsState) {
      const convertedSteps = state.rawSteps.map(
        partial(convertToStep, getVariationsByKey(provideStore()))
      );

      return orderBy(convertedSteps, "created_at", ["desc", "desc"]);
    },
    nextIdentifier(state: StepsState) {
      const step = maxBy(state.rawSteps, "identifier");
      return step ? step.identifier + 1 : 1;
    },
    stepsById() {
      return keyBy(getSteps(provideStore()), "id");
    },
    existingArtists(state: StepsState) {
      return uniq(state.rawSteps.map(step => step.artists).flat());
    },
    existingTags(state: StepsState) {
      return uniq(state.rawSteps.map(step => step.tags).flat());
    }
  },
  mutations: {
    setSteps(state: StepsState, payload: RawStep[]) {
      state.rawSteps = payload;
    },
    updateStep(state: StepsState, payload: RawStep) {
      state.rawSteps = state.rawSteps.map(step =>
        step.id === payload.id ? payload : step
      );
    },
    updateStatus(state: StepsState, payload: Status) {
      state.status = payload;
    }
  },
  actions: {
    async fetchAllSteps(context: StepsContext) {
      commitUpdateStatus(context, "pending");
      const stepsResource = Container.get(StepsResource);
      const result = await stepsResource.query(context.rootState.auth.uid);
      commitSetSteps(context, result);
      commitUpdateStatus(context, "dirty");
    },
    async createStep(
      context: StepsContext,
      payload: {
        params: CreateParams;
        selectedVariations: string[];
      }
    ) {
      const stepsResource = Container.get(StepsResource);
      await stepsResource.create(payload.params, payload.selectedVariations);
      const result = await stepsResource.query(context.rootState.auth.uid);
      commitSetSteps(context, result);
    },
    async updateStep(
      context: StepsContext,
      [stepId, params]: [string, UpdateParams]
    ) {
      const stepsResource = Container.get(StepsResource);
      const updatedStep = await stepsResource.update(stepId, params);
      commitUpdateStep(context, updatedStep);
    }
  }
};

const { commit, read, dispatch } = getStoreAccessors<StepsState, RootState>(
  "steps"
);

const { getters, mutations, actions } = steps;

// MUTATIONS
const commitSetSteps = commit(mutations.setSteps);
const commitUpdateStep = commit(mutations.updateStep);
const commitUpdateStatus = commit(mutations.updateStatus);

// GETTERS
export const getVariationsByKey = read(getters.getVariationsByKey);
export const getSteps = read(getters.getSteps);
export const nextIdentifier = read(getters.nextIdentifier);
export const stepsById = read(getters.stepsById);
export const existingArtists = read(getters.existingArtists);
export const existingTags = read(getters.existingTags);

// ACTIONS
export const dispatchFetchAllSteps = dispatch(actions.fetchAllSteps);
export const dispatchCreateStep = dispatch(actions.createStep);
export const dispatchUpdateStep = dispatch(actions.updateStep);
