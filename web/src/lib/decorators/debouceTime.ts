import { createDecorator, VueDecorator } from "vue-class-component";
import { debounce } from "lodash";

export function DebounceTime(time: number): VueDecorator {
  return createDecorator((componentOptions, fnName) => {
    if (!componentOptions.methods) {
      return;
    }

    const originalFn = componentOptions.methods[fnName];

    componentOptions.methods[fnName] = debounce(function(...args) {
      originalFn.apply(this, args);
    }, time);
  });
}
