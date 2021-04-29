import Vue from "vue";

const defaultMatchers = {
  desktop: "(min-width: 75rem)",
  portrait: "(orientation: portrait)",
  landscape: "(orientation: landscape)"
};

export type Matchers = keyof typeof defaultMatchers;

export default function MatchMediaPlugin() {
  Vue.prototype.$match = function $match(matcher: Matchers) {
    const breakpoints = {
      ...defaultMatchers,
      ...this.$options.customMatchers
    };

    if (!breakpoints[matcher]) {
      return false;
    }

    return window.matchMedia(breakpoints[matcher]).matches;
  };
}
