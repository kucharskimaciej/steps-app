<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import FeedStep from "./FeedStep.vue";
import { Step } from "../../../common/types/Step";
import IntersectSwitch from "@/components/Intersect/IntersectSwitch.vue";
import DimensionsObserver from "@/components/DimensionsObserver/DimensionsObserver";

@Component({
  components: {
    FeedStep,
    IntersectSwitch,
    DimensionsObserver
  }
})
export default class Feed extends Vue {
  @Prop({ required: true }) private steps!: Step[];
}
</script>

<template>
  <main class="h-full max-h-full overflow-y-auto">
    <div
      v-for="step in steps"
      :key="step.id"
      class="relative mb-2 desktop:mb-8"
    >
      <slot :step="step">
        <FeedStep :step="step" />
      </slot>
    </div>
  </main>
</template>
