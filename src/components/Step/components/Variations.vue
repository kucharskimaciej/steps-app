<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { Step } from "../../../../common/types/Step";

@Component
export default class Variations extends Vue {
  @Prop() private step!: Step;
}
</script>

<template>
  <div>
    <a
      v-for="variation in step.variations"
      :key="variation.id"
      :href="`#step-${variation.identifier}`"
      class="block"
    >
      <strong>#{{ variation.identifier }}</strong> {{ variation.name }}
    </a>
  </div>
</template>
