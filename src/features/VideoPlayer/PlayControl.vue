<script lang="ts">
import { defineComponent } from "vue";
import PureIcon from "@/components/PureIcon/PureIcon.vue";
import Control from "@/features/VideoPlayer/VideoControl.vue";

const PlayControl = defineComponent({
  components: {
    PureIcon,
    Control,
  },
  props: {},
  emits: [],
});

export default PlayControl;
</script>

<template>
  <Control class="text-6xl" v-bind="$attrs">
    <PureIcon type="play_circle_outline" />
  </Control>
</template>

<style lang="scss" scoped>
div {
  text-shadow: 2px 4px 2px rgba(0, 0, 0, 0.1);
}
</style>
