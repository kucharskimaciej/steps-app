<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { Step } from "../../../../common/types/Step";

@Component
export default class StepTitle extends Vue {
  @Prop() private step!: Step;
  @Prop() private linkToVideo!: boolean;
}
</script>

<template>
  <h5 class="font-heading font-normal leading-tight">
    <aside class="mr-1 inline font-bold">#{{ step.identifier }}</aside>

    <span
      :class="{
        'focus:outline-none focus:bg-yellow-base cursor-pointer': linkToVideo
      }"
      >{{ step.name }}</span
    >
  </h5>
</template>
