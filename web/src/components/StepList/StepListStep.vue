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
    class="relative bg-white p-5 border-b border-gray-100"
    :class="{ selected: isSelected, active: isActive }"
    v-on="$listeners"
  >
    <header class="font-heading font-normal leading-tight">
      {{ step.name }}
    </header>
    <footer class="mt-3">
      <PureTag
        v-for="tag in step.tags"
        :key="tag.text"
        :tag="tag"
        class="mr-1 mt-1 inline-block"
      />
    </footer>
  </article>
</template>

<style scoped>
.selected:after {
  content: "";
  display: block;
  width: theme("width.1");
  height: theme("height.10");
  position: absolute;
  top: 0;
  left: 0;
  background-color: theme("colors.blue.lighter");
  @apply mt-5;
}

.active {
  @apply bg-opacity-50;
}
</style>
