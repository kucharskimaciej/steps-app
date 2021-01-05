import { createDecorator, VueDecorator } from "vue-class-component";
import { debounce } from "lodash";
import Vue from "vue";

export function DebounceTime(time: number): VueDecorator {
  return createDecorator((componentOptions, fnName) => {
    if (!componentOptions.methods) {
      return;
    }

    const originalFn = componentOptions.methods[fnName];

    componentOptions.methods[fnName] = debounce(function(this: Vue, ...args) {
      originalFn.apply(this, args);
    }, time);
  });
}
