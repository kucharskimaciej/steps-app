import { inject, InjectionKey, Ref } from "vue";

export interface UiContext {
  navigationOpen: Ref<boolean>;
  toggleNavigation(): void;
}

export const uiContextKey: InjectionKey<UiContext> = Symbol();

export function useUi(): UiContext | undefined {
  return inject(uiContextKey);
}
