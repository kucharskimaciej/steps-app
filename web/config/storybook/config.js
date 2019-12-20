/* eslint-disable import/no-extraneous-dependencies */
import { configure } from "@storybook/vue";
import "../../src/stories/index";

// const req = ;
//
// function loadStories() {
//     req.keys().forEach(filename => {
//         console.log(filename);
//         req(filename);
//     });
// }

configure(require.context("../../src", true, /.stories.ts$/), module);
