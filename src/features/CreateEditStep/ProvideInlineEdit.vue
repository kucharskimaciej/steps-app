<script lang="ts">
import InlineStepEdit from "@/features/CreateEditStep/InlineStepEdit.vue";
import InlineModal from "@/components/Modal/InlineModal.vue";
import AspectAwareVideo from "@/components/VideoModal/AspectAwareVideo.vue";
import { Component, Prop } from "vue-property-decorator";
import { VueWithStore } from "@/lib/vueWithStore";
import { rawStepsById } from "@/store";

@Component({
  components: {
    InlineModal,
    AspectAwareVideo,
    InlineStepEdit
  }
})
export default class ProvideInlineEdit extends VueWithStore {
  @Prop({ required: true }) private stepId!: string;
  modalOpen = false;

  get step() {
    return rawStepsById(this.$store)[this.stepId];
  }

  edit() {
    this.modalOpen = true;
  }
}
</script>

<template>
  <div>
    <slot :edit="edit" />
    <InlineModal
      v-if="modalOpen"
      :modal-style="$modalStyle.BORDERLESS"
      @close-modal="modalOpen = false"
    >
      <InlineStepEdit :step="step" />
    </InlineModal>
  </div>
</template>
