<script lang="ts">
import { Component, Prop } from "vue-property-decorator";
import { Step } from "../../../common/types/Step";
import { VueWithStore } from "@/lib/vueWithStore";
import { dispatchRecordPractice, stepsById } from "@/store";
import { hasRecordedPracticeToday } from "@/lib/stepHelpers";
import PureButton from "@/components/PureButton/PureButton.vue";
import PureIcon from "@/components/PureIcon/PureIcon.vue";

@Component({
  components: {
    PureButton,
    PureIcon
  }
})
export default class RecordPracticeWidget extends VueWithStore {
  @Prop({ required: true }) private stepId!: string;
  @Prop() private collectionId!: string;

  get step(): Step {
    return stepsById(this.$store)[this.stepId];
  }

  get isTodayRecordedForCollection() {
    return hasRecordedPracticeToday(this.step, this.collectionId);
  }

  handleRecordPractice() {
    dispatchRecordPractice(this.$store, [this.stepId, this.collectionId]);
  }
}
</script>

<template>
  <span v-if="isTodayRecordedForCollection">
    <slot name="practiced" :practice="handleRecordPractice">
      <PureButton kind="ghost" @click="handleRecordPractice">
        <PureIcon type="done" /> Practiced
      </PureButton>
    </slot>
  </span>

  <span v-else>
    <slot name="not_practiced" :practice="handleRecordPractice">
      <PureButton kind="secondary" @click="handleRecordPractice">
        Record practice
      </PureButton>
    </slot>
  </span>
</template>
