<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import FeedStep from "./FeedStep.vue";
import { Step } from "../../../../common/types/Step";

@Component({
  components: {
    FeedStep
  }
})
export default class Feed extends Vue {
  @Prop({ required: true }) private steps!: Step[];
}
</script>

<template>
  <main>
    <FeedStep v-for="step in steps" :key="step.id" :step="step" class="mb-4">
      <template #actions="slotScope">
        <slot name="stepActions" v-bind="slotScope" />
      </template>
    </FeedStep>
  </main>
</template>
