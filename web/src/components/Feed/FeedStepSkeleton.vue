<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { Step } from "../../../../common/types/Step";

@Component
export default class FeedStepSkeleton extends Vue {
  @Prop() private step?: Step;
  @Prop({ default: 600 }) private height!: number;
  @Prop({ default: "85vh" }) private estimateHeight!: string;

  get anchor() {
    return this.step ? `step-${this.step.id}` : "";
  }
}
</script>

<template>
  <article
    :id="anchor"
    class="bg-mono-white rounded overflow-hidden flex flex-col opacity-40"
    :style="{
      height: height ? `${height}px` : estimateHeight
    }"
  >
    <main class="w-full bg-mono-800 mb-2 h-full"></main>
    <header class="mb-2 px-2">
      <div class="h-8 w-full bg-mono-800 rounded-sm"></div>
    </header>
    <footer class="mb-2 px-2">
      <section class="flex mb-2 -mx-2">
        <div class="w-1/3 h-8 bg-mono-800 rounded-sm mx-2"></div>
        <div class="w-1/3 h-8 bg-mono-800 rounded-sm mx-2"></div>
        <div class="w-1/3 h-8 bg-mono-800 rounded-sm mx-2"></div>
      </section>
      <section class="flex flex-wrap">
        <div class="w-14 h-6 bg-mono-800 mr-1 rounded-sm"></div>
        <div class="w-12 h-6 bg-mono-800 mr-1 rounded-sm"></div>
        <div class="w-24 h-6 bg-mono-800 mr-1 rounded-sm"></div>
        <div class="w-20 h-6 bg-mono-800 mr-1 rounded-sm"></div>
        <div class="w-14 h-6 bg-mono-800 mr-1 rounded-sm"></div>
      </section>
    </footer>
  </article>
</template>
