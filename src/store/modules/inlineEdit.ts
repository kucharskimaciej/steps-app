import { createModule } from "@/store/createModule";
import { RootState } from "@/store/types";
import { getStoreAccessors } from "typesafe-vuex";
import { ActionContext } from "vuex";

export const moduleNamespace = "inlineEdit";

export type InlineEditState = {
  stepId: string | null;
};

type InlineEditContext = ActionContext<InlineEditState, RootState>;

export const inlineEdit = createModule(
  {
    getters: {
      currentlyEditingStepId(state: InlineEditState) {
        return state.stepId;
      }
    },
    actions: {
      inlineEdit(context: InlineEditContext, payload: string) {
        commitSetStepId(context, payload);
      },
      clearInlineEdit(context: InlineEditContext) {
        commitSetStepId(context, null);
      }
    },
    mutations: {
      setStepId(state, payload: string | null) {
        state.stepId = payload;
      }
    }
  },
  {
    stepId: null
  } as InlineEditState
);
const { commit, read, dispatch } = getStoreAccessors<
  InlineEditState,
  RootState
>(moduleNamespace);

const { getters, actions, mutations } = inlineEdit;

const commitSetStepId = commit(mutations.setStepId);

export const getCurrentlyEditingStepId = read(getters.currentlyEditingStepId);

export const dispatchInlineEdit = dispatch(actions.inlineEdit);
export const dispatchClearInlineEdit = dispatch(actions.clearInlineEdit);
