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
export default class SizeControl extends Vue {
  @Prop({ required: true }) private enabled!: boolean;

  @Emit()
  toggle() {}
}
</script>

<template>
  <Control @click="toggle()">
    <PureIcon v-if="enabled" type="fullscreen_exit" />
    <PureIcon v-else type="fullscreen" />
  </Control>
</template>
