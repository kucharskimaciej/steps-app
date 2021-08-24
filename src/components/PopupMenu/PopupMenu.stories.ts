import { Component } from "vue";
import { action } from "@storybook/addon-actions";
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

      <PopupMenuItem>
        One
      </PopupMenuItem>
      <PopupMenuItem @click="itemClick('two')">
        Two
      </PopupMenuItem>
    </PopupMenu>`,
  methods: {
    itemClick: action("ITEM_CLICK")
  },
  data: () => ({}),
  props: {}
});
