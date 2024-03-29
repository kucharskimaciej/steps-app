import { createVariationId } from "@/lib/variations/variationId";
import { Container } from "typedi";
import { ActionContext } from "vuex";
import { getStoreAccessors } from "typesafe-vuex";
import { RootState, Status, StepsState } from "@/store/types";
import {
  CreateParams,
  StepsResource,
  UpdateParams,
} from "@/lib/steps.resource";
import { StepDTO, Step } from "../../../common/types/Step";
import { orderBy, uniq, uniqBy, maxBy, keyBy, groupBy } from "lodash";
import { convertToStep } from "@/lib/rawStepHelpers";
import { provideStore } from "@/store";
import { PracticeRecord } from "../../../common/types/PracticeRecord";
import { today } from "@/lib/dateHelpers";
import { hasRecordedPracticeToday } from "@/lib/stepHelpers";

type StepsContext = ActionContext<StepsState, RootState>;

type UpdateStepMutationPayload = {
  updatedStep: StepDTO;
  variationsToMerge?: string[];
};

type UpdateStepActionPayload = {
  stepId: string;
  params: UpdateParams;
  selectedVariations: string[];
};

export const steps = {
  namespaced: true,
  state: {
    rawSteps: [],
    stepsViewedInCurrentSession: [],
    status: "clean",
  },
  getters: {
    rawStepsById(state: StepsState) {
      return keyBy(state.rawSteps, "id");
    },
    getVariationsByKey(state: StepsState): Record<string, StepDTO[]> {
      return groupBy(state.rawSteps, "variationKey");
    },
    getSteps(state: StepsState): Step[] {
      const variationsByKey = getVariationsByKey(provideStore());
      const convertedSteps = state.rawSteps.map((rawStep) =>
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
      return uniq(state.rawSteps.map((step) => step.artists).flat()).filter(
        Boolean
      );
    },
    existingTags(state: StepsState): string[] {
      return uniq([
        ...state.rawSteps.map((step) => step.tags).flat(),
        ...state.rawSteps.map((step) => step.smart_tags).flat(),
      ]).filter(Boolean);
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
        .map((step) => step.id)
        .sort();
    },
  },
  mutations: {
    setSteps(state: StepsState, payload: StepDTO[]) {
      state.rawSteps = payload;
    },
    updateStep(
      state: StepsState,
      { updatedStep, variationsToMerge }: UpdateStepMutationPayload
    ) {
      const previousValue = state.rawSteps.find(
        (step) => updatedStep.id === step.id
      );

      if (!previousValue) {
        return;
      }

      state.rawSteps = state.rawSteps.map((step) => {
        if (step.id === updatedStep.id) {
          return updatedStep;
        }

        if (variationsToMerge?.includes(step.variationKey)) {
          return {
            ...step,
            variationKey: updatedStep.variationKey,
          };
        }

        return step;
      });
    },
    updateStatus(state: StepsState, payload: Status) {
      state.status = payload;
    },
    markStepAsViewed(state: StepsState, stepId: string) {
      state.stepsViewedInCurrentSession.push(stepId);
    },
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
      { stepId, params, selectedVariations }: UpdateStepActionPayload
    ) {
      const stepsResource = Container.get(StepsResource);
      const currentStep = rawStepsById(context)[stepId];

      const variationKey = createVariationId();

      const updatedStep = { ...currentStep, ...params, variationKey };

      commitUpdateStep(context, {
        updatedStep,
        variationsToMerge: selectedVariations,
      });

      await stepsResource.update(
        stepId,
        params,
        variationKey,
        selectedVariations
      );
    },
    async recordPractice(
      context: StepsContext,
      [stepId, collectionId]: [string, string?]
    ) {
      const stepsResource = Container.get(StepsResource);
      const step = rawStepsById(provideStore())[stepId];
      const startOfToday = today();

      if (hasRecordedPracticeToday(step, collectionId)) {
        return;
      }

      const record: PracticeRecord = {
        start_of_day: startOfToday,
        date: Date.now(),
      };
      if (collectionId) {
        record.collection_id = collectionId;
      }

      const updatePayload: UpdateParams = {
        practice_records: [record, ...(step.practice_records || [])],
      };

      const optimisticUpdatedStep: StepDTO = {
        ...step,
        ...updatePayload,
      };

      commitUpdateStep(context, { updatedStep: optimisticUpdatedStep });
      await stepsResource.update(stepId, updatePayload);
    },
    async recordView(context: StepsContext, stepId: string) {
      const stepsResource = Container.get(StepsResource);
      if (context.state.stepsViewedInCurrentSession.includes(stepId)) {
        // avoid duplicate view records in single app load
        return;
      }

      const step = stepsById(provideStore())[stepId];

      const updatedStep = await stepsResource.update(stepId, {
        view_records: [Date.now(), ...(step.view_records || [])],
      });
      commitMarkStepAsViewed(context, step.id);
      commitUpdateStep(context, { updatedStep });
    },
  },
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
export const rawStepsById = read(getters.rawStepsById);
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
