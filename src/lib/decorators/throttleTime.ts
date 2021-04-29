import { createDecorator, VueDecorator } from "vue-class-component";
import { throttle, ThrottleSettings } from "lodash";
import Vue from "vue";

export function ThrottleTime(
  time: number,
  options?: ThrottleSettings
): VueDecorator {
  return createDecorator((componentOptions, fnName) => {
    if (!componentOptions.methods) {
      return;
    }

    const originalFn = componentOptions.methods[fnName];

    componentOptions.methods[fnName] = throttle(
      function(this: Vue, ...args) {
        originalFn.apply(this, args);
      },
      time,
      options
    );
  });
}
