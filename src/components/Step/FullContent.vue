<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { Step } from "../../../common/types/Step";
import StepTitle from "@/components/Step/components/StepTitle.vue";
import StepVideoLinks from "@/components/Step/components/VideoLinks.vue";
import Tags from "@/components/Step/components/Tags.vue";
import Variations from "@/components/Step/components/Variations.vue";

@Component({
  components: {
    StepTitle,
    StepVideoLinks,
    Tags,
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

    <Tags :step="step" category="meta" class="mb-1" />
    <Tags :step="step" category="content" class="mb-2" />

    <section v-if="step.variations.length > 0" class="text-sm">
      <h2 class="font-semibold">
        Variations
      </h2>
      <Variations :step="step" />
    </section>
  </main>
</template>
