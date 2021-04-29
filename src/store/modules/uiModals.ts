import { ActionContext } from "vuex";
import { Container } from "vue-typedi";
import { ModalsState, RootState } from "@/store/types";
import { createModule } from "@/store/createModule";
import { ModalRef, MODALS } from "@/lib/modals/modals";
import { ModalsService } from "@/lib/modals/service";
import { getStoreAccessors } from "typesafe-vuex";
import { reverse } from "lodash";

type Context = ActionContext<ModalsState, RootState>;

export const uiModals = createModule(
  {
    mutations: {
      push(state: ModalsState, ref: ModalRef) {
        state.stack = [ref, ...state.stack];
      },
      pop(state: ModalsState) {
        const [, ...rest] = state.stack;
        state.stack = rest;
      },
      replaceStack(state: ModalsState, stack: ModalsState["stack"]) {
        state.stack = stack;
      }
    },
    actions: {
      openModal<Token extends MODALS>(
        context: Context,
        payload: {
          modal: Token;
          params: Parameters<ModalsService[Token]>;
        }
      ) {
        const service = Container.get(ModalsService);
        const ref = service.createRef(payload.modal, ...payload.params);

        commitPush(context, ref);
      },
      closeTopModal(context: Context) {
        commitPop(context);
      },
      closeModal(context: Context, id: string) {
        commitReplaceStack(
          context,
          context.state.stack.filter(modal => modal.uuid !== id)
        );
      }
    },
    getters: {
      openModals(state: ModalsState): ModalRef[] {
        return reverse(state.stack);
      }
    }
  },
  { stack: [] }
);

const { commit, read, dispatch } = getStoreAccessors<ModalsState, RootState>(
  "uiModals"
);

const commitPush = commit(uiModals.mutations.push);
const commitPop = commit(uiModals.mutations.pop);
const commitReplaceStack = commit(uiModals.mutations.replaceStack);

export const getOpenModals = read(uiModals.getters.openModals);

export const dispatchOpenModal = dispatch(uiModals.actions.openModal);
export const dispatchCloseTopModal = dispatch(uiModals.actions.closeTopModal);
export const dispatchCloseModal = dispatch(uiModals.actions.closeModal);
