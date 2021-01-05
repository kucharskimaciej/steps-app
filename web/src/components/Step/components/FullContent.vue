<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { Step } from "../../../../../common/types/Step";
import StepTitle from "@/components/Step/components/StepTitle.vue";
import StepVideoLinks from "@/components/Step/components/VideoLinks.vue";
import AllTags from "@/components/Step/components/AllTags.vue";
import Variations from "@/components/Step/components/Variations.vue";

@Component({
  components: {
    StepTitle,
    StepVideoLinks,
    AllTags,
    Variations
  }
})
export default class FullContent extends Vue {
  @Prop() private step!: Step;
}
</script>

<template>
  <main>
    <header class="mb-2">
      <StepTitle :step="step" link-to-video />
      <StepVideoLinks :step="step" skip-first />
    </header>

    <AllTags :step="step" class="mb-2" />

    <section v-if="step.variations.length > 0">
      <h2 class="font-semibold">
        Variations
      </h2>
      <Variations :step="step" />
    </section>
  </main>
</template>
