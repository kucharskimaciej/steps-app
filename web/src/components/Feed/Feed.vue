<script lang="ts">
import { Vue, Component, Prop, Emit } from "vue-property-decorator";
import FeedStep from "./FeedStep.vue";
import { Step } from "../../../../common/types/Step";
import IntersectSwitch from "@/components/Intersect/IntersectSwitch.vue";
import FeedStepSkeleton from "@/components/Feed/FeedStepSkeleton.vue";
import HeightObserver from "@/components/HeightObserver/HeightObserver";

@Component({
  components: {
    FeedStep,
    FeedStepSkeleton,
    IntersectSwitch,
    HeightObserver
  }
})
export default class Feed extends Vue {
  @Prop({ required: true }) private steps!: Step[];

  @Emit()
  stepViewed(stepId: string) {
    return stepId;
  }
}
</script>

<template>
  <main class="h-full max-h-full overflow-y-auto">
    <HeightObserver
      v-for="step in steps"
      :id="step.name"
      :key="step.id"
      max-height
    >
      <template #default="{ height }">
        <IntersectSwitch
          :viewport-root="$el"
          :threshold="[0, 0.3, 0.5, 0.6, 0.8, 1]"
        >
          <template #default="{visible}">
            <div class="relative mb-4">
              <FeedStep
                v-if="visible"
                :step="step"
                @viewed="stepViewed(step.id)"
              >
                <template #actions="slotScope">
                  <slot name="stepActions" v-bind="slotScope" />
                </template>
              </FeedStep>
              <FeedStepSkeleton v-else :height="height" />
            </div>
          </template>
        </IntersectSwitch>
      </template>
    </HeightObserver>
  </main>
</template>
