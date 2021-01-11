<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { Step } from "../../../../../common/types/Step";

@Component
export default class StepTitle extends Vue {
  @Prop() private step!: Step;
  @Prop() private linkToVideo!: boolean;

  get firstVideoUrl(): string {
    const [firstVideo] = this.step.videos;
    return firstVideo.url;
  }
}
</script>

<template>
  <h5 class="font-heading font-normal leading-tight">
    <aside class="mr-1 inline font-bold">#{{ step.identifier }}</aside>

    <a
      v-if="linkToVideo"
      target="_blank"
      referrerpolicy="no-referrer"
      class="focus:outline-none focus:bg-yellow-base cursor-pointer"
      @click="$openModal($modals.SINGLE_VIDEO, firstVideoUrl)"
      >{{ step.name }}</a
    >
    <span v-else>{{ step.name }}</span>
  </h5>
</template>
