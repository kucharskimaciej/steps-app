<script lang="ts">
import { defineComponent } from "vue";
import PureIcon from "@/components/PureIcon/PureIcon.vue";
import Control from "@/features/VideoPlayer/VideoControl.vue";

const MuteControl = defineComponent({
  components: {
    PureIcon,
    Control,
  },
  props: {
    muted: {
      required: true,
      type: Boolean,
    },
  },
});

export default MuteControl;
</script>

<template>
  <Control v-bind="$attrs">
    <PureIcon v-if="muted" type="volume_off" />
    <PureIcon v-else type="volume_up" />
  </Control>
</template>
