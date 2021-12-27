<script lang="ts">
import { Vue, Component, Prop, Emit } from "vue-property-decorator";
import PureIcon from "@/components/PureIcon/PureIcon.vue";
import Control from "@/features/VideoPlayer/Control.vue";

@Component({
  components: {
    PureIcon,
    Control
  }
})
export default class SlowControl extends Vue {
  @Prop({ required: true }) private enabled!: boolean;

  @Emit()
  toggle() {}
}
</script>

<template>
  <Control @click="toggle()">
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
