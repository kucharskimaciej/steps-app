import { configure } from "@storybook/vue";
import "../../src/stories/index";

configure(require.context("../../src", true, /.stories.ts$/), module);
