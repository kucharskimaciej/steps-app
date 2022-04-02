<script lang="ts">
import { computed, defineComponent } from "@vue/composition-api";
import PureButton from "@/components/PureButton/PureButton.vue";
import PureIcon from "@/components/PureIcon/PureIcon.vue";
import { dispatchRecordPractice, stepsById, useStore } from "@/store";
import { hasRecordedPracticeToday } from "@/lib/stepHelpers";

const RecordPracticeWidget = defineComponent({
  components: {
    PureButton,
    PureIcon
  },
  props: {
    stepId: {
      type: String,
      required: true
    },
    collectionId: String
  },
  setup({ stepId, collectionId }) {
    const store = useStore();

    function handleRecordPractice() {
      dispatchRecordPractice(store, [stepId, collectionId]);
    }

    const step = computed(() => stepsById(store)[stepId]);
    const isTodayRecordedForCollection = computed(() =>
      hasRecordedPracticeToday(step.value, collectionId)
    );

    return {
      handleRecordPractice,
      isTodayRecordedForCollection
    };
  }
});

export default RecordPracticeWidget;
</script>

<template>
  <span v-if="isTodayRecordedForCollection">
    <slot name="practiced" :practice="handleRecordPractice">
      <PureButton kind="ghost" @click="handleRecordPractice()">
        <PureIcon type="done" /> Practiced
      </PureButton>
    </slot>
  </span>

  <span v-else>
    <slot name="not_practiced" :practice="handleRecordPractice">
      <PureButton kind="secondary" @click="handleRecordPractice()">
        Record practice
      </PureButton>
    </slot>
  </span>
</template>
