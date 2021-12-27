<script lang="ts">
import Feed from "@/features/Feed/Feed.vue";
import InlineModal from "@/components/Modal/InlineModal.vue";
import { stepsById } from "@/store";
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({
  components: {
    InlineModal,
    Feed
  }
})
export default class ProvideStepVariations extends Vue {
  @Prop({ required: true }) private stepId!: string;

  get step() {
    return stepsById(this.$store)[this.stepId];
  }

  variationsOpen = false;

  get hasVariations() {
    return this.step.variations?.length > 0;
  }

  get variationsCount(): number {
    return this.step.variations?.length || 0;
  }

  openVariationsModal() {
    this.variationsOpen = true;
  }
}
</script>

<template>
  <div>
    <slot
      :has-variations="hasVariations"
      :variations-count="variationsCount"
      :open-variations-modal="openVariationsModal"
    ></slot>
    <InlineModal
      v-if="variationsOpen"
      modal-style="OVERLAY"
      @close-modal="variationsOpen = false"
    >
      <Feed :steps="step.variations" />
    </InlineModal>
  </div>
</template>
