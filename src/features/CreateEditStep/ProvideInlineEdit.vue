<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import InlineStepEdit from "@/features/CreateEditStep/InlineStepEdit.vue";
import InlineModal from "@/components/Modal/InlineModal.vue";
import { rawStepsById, useStore } from "@/store";

const ProvideInlineEdit = defineComponent({
  components: {
    InlineModal,
    InlineStepEdit,
  },
  props: {
    stepId: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const store = useStore();
    const modalOpen = ref(false);

    const step = computed(() => rawStepsById(store)[props.stepId]);

    function edit() {
      modalOpen.value = true;
    }

    return {
      step,
      edit,
      modalOpen,
    };
  },
});

export default ProvideInlineEdit;
</script>

<template>
  <div>
    <slot :edit="edit" />
    <InlineModal
      v-if="modalOpen"
      :modal-style="$modalStyle.BORDERLESS"
      @close-modal="modalOpen = false"
    >
      <InlineStepEdit :step="step" @finished="modalOpen = false" />
    </InlineModal>
  </div>
</template>
