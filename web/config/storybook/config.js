/* eslint-disable import/no-extraneous-dependencies */
import { configure } from "@storybook/vue";
import "../../src/stories/index";

const req = require.context("../../src", true, /.stories.ts$/);

function loadStories() {
    req.keys().forEach(filename => {
        req(filename);
    });
}

configure(loadStories, module);
