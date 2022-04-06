<script lang="ts">
import { defineComponent } from "vue";
import PureIcon from "@/components/PureIcon/PureIcon.vue";
import Control from "@/features/VideoPlayer/VideoControl.vue";

const SizeControl = defineComponent({
  components: {
    PureIcon,
    Control,
  },
});

export default SizeControl;
</script>

<template>
  <Control v-bind="$attrs">
    <PureIcon type="fullscreen" />
  </Control>
</template>
