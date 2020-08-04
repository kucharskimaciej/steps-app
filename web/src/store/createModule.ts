export type ModuleWithState<T> = {
  namespaced: true;
  state: T;
};

export type Accessors = {
  getters: any;
  mutations: any;
  actions: any;
};

export function createModule<StateType, AccessorType extends Accessors>(
  accessors: AccessorType,
  initialState: StateType
): ModuleWithState<StateType> & AccessorType {
  return {
    namespaced: true,
    state: initialState,
    ...accessors
  };
}
