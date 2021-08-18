import { Component } from "vue";
import {
  NeutralBackground,
  Spacing,
  WithGlobalStyles,
  Container,
  WithModals
} from "@/stories/decorators";
import PopupMenu from "@/components/PopupMenu/PopupMenu.vue";
import PopupMenuItem from "@/components/PopupMenu/PopupMenuItem.vue";

export default {
  title: "Components/PopupMenu",
  decorators: [
    Container("600px"),
    Spacing,
    WithGlobalStyles,
    NeutralBackground,
    WithModals
  ]
};

export const BasicUsage: () => Component = () => ({
  components: {
    PopupMenu,
    PopupMenuItem
  },
  template: `<PopupMenu>
      <template #toggle="{ open }">
        <span @click="open">click?</span>
      </template>

      <PopupMenuItem>One</PopupMenuItem>
      <PopupMenuItem>Two</PopupMenuItem>
    </PopupMenu>`,
  methods: {},
  data: () => ({}),
  props: {}
});
