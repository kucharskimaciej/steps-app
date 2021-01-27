<script lang="ts">
import { Component, Prop } from "vue-property-decorator";
import { Step } from "../../../../common/types/Step";
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
  <PureButton
    v-if="isTodayRecordedForCollection"
    feel="ghost"
    @click="handleRecordPractice"
  >
    <PureIcon type="done" /> Practiced
  </PureButton>
  <PureButton v-else feel="ghost" kind="default" @click="handleRecordPractice">
    Record practice {{ isTodayRecordedForCollection }}
  </PureButton>
</template>
