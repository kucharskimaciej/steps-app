import { Component } from "vue";
import {
  NeutralBackground,
  Spacing,
  WithGlobalStyles,
  Container,
  WithModals,
} from "@/stories/decorators";
import InlineModal from "@/components/Modal/InlineModal.vue";

export default {
  title: "Components/Modal/InlineModal",
  decorators: [
    Container("600px"),
    Spacing,
    WithGlobalStyles,
    NeutralBackground,
    WithModals,
  ],
};

export const Overlay: () => Component = () => ({
  components: {
    InlineModal,
  },
  template: `
      <section>
        <span @click="modalOpen = true">open modal</span>
        <InlineModal v-if="modalOpen" @close-modal="modalOpen = false">
          this is it~
        </InlineModal>
      </section>
    `,
  methods: {},
  data: () => ({
    modalOpen: false,
  }),
  props: {},
});

export const BorderlessOverlay: () => Component = () => ({
  components: {
    InlineModal,
  },
  template: `
      <section>
        <span @click="modalOpen = true">open modal</span>
        <InlineModal v-if="modalOpen" @close-modal="modalOpen = false" :modal-style="$modalStyle.BORDERLESS">
          this is it~
        </InlineModal>
      </section>
    `,
  methods: {},
  data: () => ({
    modalOpen: false,
  }),
  props: {},
});

export const Drawer: () => Component = () => ({
  components: {
    InlineModal,
  },
  template: `
      <section>
        <span @click="modalOpen = true">open drawer</span>
        <InlineModal v-if="modalOpen" @close-modal="modalOpen = false" :modal-style="$modalStyle.DRAWER">
          this is it~
        </InlineModal>
      </section>
    `,
  methods: {},
  data: () => ({
    modalOpen: false,
  }),
  props: {},
});

export const Popup: () => Component = () => ({
  components: {
    InlineModal,
  },
  template: `
      <section>
        <span @click="modalOpen = true">open popup</span>
        <InlineModal v-if="modalOpen" @close-modal="modalOpen = false" :modal-style="$modalStyle.POPUP">
          this is it
        </InlineModal>
      </section>
    `,
  methods: {},
  data: () => ({
    modalOpen: false,
  }),
  props: {},
});
