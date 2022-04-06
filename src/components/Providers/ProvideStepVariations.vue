<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import InlineModal from "@/components/Modal/InlineModal.vue";
import Feed from "@/features/Feed/StepsFeed.vue";
import { stepsById, useStore } from "@/store";

const ProvideStepVariations = defineComponent({
  components: {
    InlineModal,
    Feed,
  },
  props: {
    stepId: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const store = useStore();
    const step = computed(() => stepsById(store)[props.stepId]);
    const variationsOpen = ref(false);

    const variationsCount = computed(() => step.value.variations?.length ?? 0);

    function openVariationsModal() {
      variationsOpen.value = true;
    }

    return {
      step,
      variationsOpen,
      variationsCount,
      openVariationsModal,
    };
  },
});

export default ProvideStepVariations;
</script>

<template>
  <div>
    <slot
      :has-variations="variationsCount > 0"
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
