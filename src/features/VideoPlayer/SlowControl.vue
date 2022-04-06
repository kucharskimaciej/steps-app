<script lang="ts">
import { defineComponent } from "vue";
import PureIcon from "@/components/PureIcon/PureIcon.vue";
import Control from "@/features/VideoPlayer/Control.vue";

const SlowControl = defineComponent({
  components: {
    PureIcon,
    Control,
  },
  props: {
    enabled: {
      type: Boolean,
      required: true,
    },
  },
});

export default SlowControl;
</script>

<template>
  <Control v-on="$listeners">
    <PureIcon
      v-if="enabled"
      type="slow_motion_video"
      class="enabled text-2xl"
    />
    <PureIcon v-else type="slow_motion_video" class="disabled text-2xl" />
  </Control>
</template>

<style lang="scss" scoped>
.enabled {
  opacity: 1;
}

.disabled {
  opacity: 0.6;
}
</style>
