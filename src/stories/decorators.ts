/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars */

import GlobalStyles from "@/components/GlobalStyles.vue";
import { DecoratorFunction } from "@storybook/addons/dist/types";
import ModalContainer from "@/components/Modal/ModalContainer.vue";

export const WithGlobalStyles: DecoratorFunction<any> = (story) => ({
  template: `<GlobalStyles><story/></GlobalStyles>`,
  components: {
    GlobalStyles,
  },
});

export const Spacing: DecoratorFunction<any> = (story) => ({
  template:
    '<main class="w-screen min-h-screen flex"><div class="m-auto"><story/></div></main>',
});

export const NeutralBackground: DecoratorFunction<any> = (story) => ({
  template: `<div class="w-screen min-h-screen bg-gray-100"><story/></div>`,
});

export const DarkBackground: DecoratorFunction<any> = (story) => ({
  template: `<div class="w-screen min-h-screen bg-mono-200"><story/></div>`,
});

export const Container: (
  w: string | number,
  h?: string | number
) => DecoratorFunction<any> =
  (w, h = "auto") =>
  (story) => ({
    template: `<div style="width: ${w}; height: ${h}; max-width: 100vw;"><story/></div>`,
  });

export const WithModals: DecoratorFunction<any> = (story) => ({
  components: {
    ModalContainer,
  },
  template: `<div id="WithModals"><story /><ModalContainer /></div>`,
});
/* eslint-enable @typescript-eslint/no-explicit-any,@typescript-eslint/no-unused-vars */
