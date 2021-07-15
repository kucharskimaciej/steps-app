import { RootState, Status, WithStatus } from "@/store/types";
import {
  ActionHandlerNoPayload,
  ActionHandlerWithPayload,
  GetterHandler,
  MutationHandlerNoPayload,
  MutationHandlerWithPayload
} from "typesafe-vuex";

export type ModuleWithState<T> = {
  namespaced: true;
  state: T;
};

export type Accessors<TModuleState> = {
  getters: Record<string, GetterHandler<TModuleState, RootState, unknown>>;
  mutations: Record<
    string,
    | MutationHandlerNoPayload<TModuleState>
    | MutationHandlerWithPayload<TModuleState, any>
  >;
  actions: Record<
    string,
    | ActionHandlerNoPayload<TModuleState, RootState, unknown>
    | ActionHandlerWithPayload<TModuleState, RootState, any, unknown>
  >;
};

export function createModule<
  StateType,
  AccessorType extends Accessors<StateType>
>(
  accessors: AccessorType,
  initialState: StateType
): ModuleWithState<StateType> & AccessorType {
  return {
    namespaced: true,
    state: initialState,
    ...accessors
  };
}

export function updateStatus<T extends WithStatus>(state: T, payload: Status) {
  state.status = payload;
}

export function provideInitialStatus(status: Status = "clean") {
  return {
    status
  };
}
