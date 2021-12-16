<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import PureIcon from "@/components/PureIcon/PureIcon.vue";

export type Positions = "topRight" | "topLeft";
export type Style = "default" | "filled";

@Component({
  components: {
    PureIcon
  }
})
export default class Close extends Vue {
  @Prop({ default: "topLeft" }) private iconPosition!: Positions;
  @Prop({ default: "default" }) private iconStyle!: Style;
}
</script>

<template>
  <aside
    v-bind="$attrs"
    class="absolute top-0 m-2 desktop:m-4 text-3xl leading-none cursor-pointer"
    :class="{
      'right-0': iconPosition === 'topRight',
      'left-0': iconPosition === 'topLeft',
      'bg-white rounded-full pt-px': iconStyle === 'filled'
    }"
    v-on="$listeners"
  >
    <PureIcon type="close" />
  </aside>
</template>
