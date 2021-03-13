<script lang="ts">
import { Component, Emit, Prop } from "vue-property-decorator";
import Intersect from "./Intersect";
import { IntersectComponentProps } from "@/components/Intersect/intersectComponentProps";

@Component({
  components: {
    Intersect
  }
})
export default class IntersectSwitch extends IntersectComponentProps {
  @Prop({ default: 0.7 }) private visibilityThreshold!: number;
  currentlyVisible = false;
  currentRatio = 1;

  @Emit("change")
  handleChange(entry: IntersectionObserverEntry) {
    this.currentRatio = entry.intersectionRatio;
    this.currentlyVisible = this.currentRatio > this.visibilityThreshold;
    return {
      visible: this.currentlyVisible,
      ratio: this.currentRatio,
      entry
    };
  }
}
</script>

<template>
  <Intersect v-bind="$props" @change="handleChange">
    <slot :visible="currentlyVisible" :ratio="currentRatio">
      <slot v-if="currentlyVisible" name="visible" />
      <slot v-else name="hidden" />
    </slot>
  </Intersect>
</template>
