<script lang="ts">
import { defineComponent, PropType } from "vue";
import PopupMenu from "@/components/PopupMenu/PopupMenu.vue";
import PopupMenuItem from "@/components/PopupMenu/PopupMenuItem.vue";
import CopyToClipboard from "@/components/CopyToClipboard/CopyToClipboard.vue";
import { Step } from "../../../common/types/Step";

const OptionsPopup = defineComponent({
  components: {
    PopupMenu,
    PopupMenuItem,
    CopyToClipboard,
  },
  props: {
    step: {
      type: Object as PropType<Step>,
      required: true,
    },
  },
});

export default OptionsPopup;
</script>

<template>
  <PopupMenu>
    <template #toggle="toggleProps">
      <slot name="toggle" v-bind="toggleProps" />
    </template>

    <CopyToClipboard
      :value="$filters.shortLink(step, $router)"
      class="ml-auto self-start"
    >
      <PopupMenuItem> Copy link </PopupMenuItem>
    </CopyToClipboard>

    <slot name="customOptions" />

    <PopupMenuItem> Cancel </PopupMenuItem>
  </PopupMenu>
</template>
