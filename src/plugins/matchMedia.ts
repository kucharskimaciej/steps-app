import { Plugin } from "vue";

const defaultMatchers = {
  desktop: "(min-width: 75rem)",
  portrait: "(orientation: portrait)",
  landscape: "(orientation: landscape)"
};

export type Matchers = keyof typeof defaultMatchers;

const MatchMediaPlugin: Plugin = (app, options = {}) => {
  function $match(matcher: Matchers) {
    const breakpoints = {
      ...defaultMatchers,
      ...options.customMatchers
    };

    if (!breakpoints[matcher]) {
      return false;
    }

    return window.matchMedia(breakpoints[matcher]).matches;
  }

  app.config.globalProperties.$match = $match;
};

export default MatchMediaPlugin;
