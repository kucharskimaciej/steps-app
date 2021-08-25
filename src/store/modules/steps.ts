import { Container } from "vue-typedi";
import { ActionContext } from "vuex";
import { getStoreAccessors } from "typesafe-vuex";
import { RootState, Status, StepsState } from "@/store/types";
import {
  CreateParams,
  StepsResource,
  UpdateParams
} from "@/lib/steps.resource";
import { RawStep, Step } from "../../../common/types/Step";
import { orderBy, uniq, uniqBy, maxBy, keyBy, groupBy } from "lodash";
import { convertToStep } from "@/lib/rawStepHelpers";
import { provideStore } from "@/store";
import { PracticeRecord } from "../../../common/types/PracticeRecord";
import { today } from "@/lib/dateHelpers";
import { hasRecordedPracticeToday } from "@/lib/stepHelpers";

type StepsContext = ActionContext<StepsState, RootState>;

export const steps = {
  namespaced: true,
  state: {
    rawSteps: [],
    stepsViewedInCurrentSession: [],
    status: "clean"
  },
  getters: {
    getVariationsByKey(state: StepsState): Record<string, RawStep[]> {
      return groupBy(state.rawSteps, "variationKey");
    },
    getSteps(state: StepsState): Step[] {
      const variationsByKey = getVariationsByKey(provideStore());
      const convertedSteps = state.rawSteps.map(rawStep =>
        convertToStep(rawStep, variationsByKey)
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
    existingTags(state: StepsState): string[] {
      return uniq([
        ...state.rawSteps.map(step => step.tags).flat(),
        ...state.rawSteps.map(step => step.smart_tags).flat()
      ]);
    },
    stepsByPracticeDate(): Record<number, Step[]> {
      return getSteps(provideStore()).reduce(($, step) => {
        for (const practiceRecord of step.practice_records || []) {
          $[practiceRecord.date] = $[practiceRecord.date]
            ? uniqBy([...$[practiceRecord.date], step], "id")
            : [step];
        }

        return $;
      }, {} as Record<number, Step[]>);
    },
    stableStepIds(): string[] {
      return getSteps(provideStore())
        .map(step => step.id)
        .sort();
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
    },
    markStepAsViewed(state: StepsState, stepId: string) {
      state.stepsViewedInCurrentSession.push(stepId);
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
      payload: {
        stepId: string;
        params: UpdateParams;
        selectedVariations: string[];
      }
    ) {
      const stepsResource = Container.get(StepsResource);
      const updatedStep = await stepsResource.update(
        payload.stepId,
        payload.params,
        payload.selectedVariations
      );
      commitUpdateStep(context, updatedStep);
    },
    async recordPractice(
      context: StepsContext,
      [stepId, collectionId]: [string, string?]
    ) {
      const stepsResource = Container.get(StepsResource);
      const step = stepsById(provideStore())[stepId];
      const startOfToday = today();

      if (hasRecordedPracticeToday(step, collectionId)) {
        return;
      }

      const record: PracticeRecord = { date: startOfToday };
      if (collectionId) {
        record.collection_id = collectionId;
      }
      const updatedStep = await stepsResource.update(stepId, {
        practice_records: [record, ...(step.practice_records || [])]
      });

      commitUpdateStep(context, updatedStep);
    },
    async recordView(context: StepsContext, stepId: string) {
      const stepsResource = Container.get(StepsResource);
      if (context.state.stepsViewedInCurrentSession.includes(stepId)) {
        // avoid duplicate view records in single app load
        return;
      }

      const step = stepsById(provideStore())[stepId];

      const updatedStep = await stepsResource.update(stepId, {
        view_records: [Date.now(), ...(step.view_records || [])]
      });
      commitMarkStepAsViewed(context, step.id);
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
const commitMarkStepAsViewed = commit(mutations.markStepAsViewed);

// GETTERS
export const getVariationsByKey = read(getters.getVariationsByKey);
export const getSteps = read(getters.getSteps);
export const nextIdentifier = read(getters.nextIdentifier);
export const stepsById = read(getters.stepsById);
export const existingArtists = read(getters.existingArtists);
export const existingTags = read(getters.existingTags);
export const stepsByPracticeDate = read(getters.stepsByPracticeDate);
export const stableStepIds = read(getters.stableStepIds);

// ACTIONS
export const dispatchFetchAllSteps = dispatch(actions.fetchAllSteps);
export const dispatchCreateStep = dispatch(actions.createStep);
export const dispatchUpdateStep = dispatch(actions.updateStep);
export const dispatchRecordPractice = dispatch(actions.recordPractice);
export const dispatchRecordView = dispatch(actions.recordView);
