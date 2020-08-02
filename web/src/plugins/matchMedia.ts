import Vue from "vue";

export default function MatchMediaPlugin() {
  const defaultMatchers = {
    desktop: "(min-width: 75rem)"
  };

  Vue.prototype.$match = function $match<
    K extends keyof typeof defaultMatchers
  >(matcher: K) {
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
