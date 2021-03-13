<script lang="ts">
import { Vue, Component, Prop, Emit } from "vue-property-decorator";
import FeedStep from "./FeedStep.vue";
import { Step } from "../../../../common/types/Step";
import IntersectSwitch from "@/components/Intersect/IntersectSwitch.vue";
import FeedStepSkeleton from "@/components/Feed/FeedStepSkeleton.vue";
import DimensionsObserver from "@/components/DimensionsObserver/DimensionsObserver";

@Component({
  components: {
    FeedStep,
    FeedStepSkeleton,
    IntersectSwitch,
    DimensionsObserver
  }
})
export default class Feed extends Vue {
  @Prop({ required: true }) private steps!: Step[];

  private;

  @Emit()
  stepViewed(stepId: string) {
    return stepId;
  }

  scaledVideoHeight(step: Step, targetWidth: number): number {
    const { height, width } = step.videos[0];
    if (!height || !width || !targetWidth) {
      return 500;
    }

    const scaleRatio = targetWidth / width;
    return scaleRatio * height;
  }
}
</script>

<template>
  <main class="h-full max-h-full overflow-y-auto">
    <DimensionsObserver v-for="step in steps" :key="step.id" max-height>
      <template #default="{ height, width }">
        <IntersectSwitch
          :viewport-root="$el"
          :threshold="[0, 0.3, 0.5, 0.6, 0.8, 1]"
        >
          <template #default="{visible}">
            <div class="relative mb-4">
              <FeedStep
                v-if="visible"
                :step="step"
                :video-height="scaledVideoHeight(step, width)"
                @viewed="stepViewed(step.id)"
              >
                <template #actions="slotScope">
                  <slot name="stepActions" v-bind="slotScope" />
                </template>
              </FeedStep>
              <FeedStepSkeleton
                v-else
                :video-height="scaledVideoHeight(step, width)"
                :total-height="height"
              />
            </div>
          </template>
        </IntersectSwitch>
      </template>
    </DimensionsObserver>
  </main>
</template>
