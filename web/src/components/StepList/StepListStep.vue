<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { Step } from "../../../../common/types/Step";
import PureTag from "@/components/Tags/PureTag.vue";

@Component({
  components: {
    PureTag
  }
})
export default class StepListStep extends Vue {
  @Prop({ required: true }) private step!: Step;
  @Prop({ default: false }) private isActive!: boolean;
  @Prop({ default: false }) private isSelected!: boolean;
}
</script>

<template>
  <article
    class="flex items-start relative px-2 py-4 border border-gray-300 hover:border-gray-400"
    :class="{
      'bg-gray-200 bg-opacity-50': !isActive && !isSelected,
      'bg-gray-200 bg-opacity-75': isSelected,
      'bg-white shadow-md border-gray-400 z-10': isActive
    }"
    v-on="$listeners"
  >
    <slot name="before" />

    <header class="mx-4 font-heading font-normal leading-tight">
      {{ step.name }}
    </header>
  </article>
</template>
