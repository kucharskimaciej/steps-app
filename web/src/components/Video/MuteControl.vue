<script lang="ts">
import { Vue, Component, Prop, Emit } from "vue-property-decorator";
import PureIcon from "@/components/PureIcon/PureIcon.vue";
import Control from "@/components/Video/Control.vue";

@Component({
  components: {
    PureIcon,
    Control
  }
})
export default class MuteControl extends Vue {
  @Prop({ required: true }) private muted!: boolean;

  @Emit()
  toggleMuted() {}
}
</script>

<template>
  <Control @click="toggleMuted()">
    <PureIcon v-if="muted" type="volume_off" />
    <PureIcon v-else type="volume_up" />
  </Control>
</template>
