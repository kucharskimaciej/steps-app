<script>
// @todo
export default {};
</script>

<template>
  <span />
</template>
<!--<script lang="ts">-->
<!--import { Component, Prop } from "vue-property-decorator";-->
<!--import { VueWithStore } from "@/lib/vueWithStore";-->
<!--import Container from "@/components/Layout/Container.vue";-->
<!--import AllStepsProvider from "../../components/Providers/AllStepsProvider";-->
<!--import Feed from "@/features/Feed/StepsFeed.vue";-->
<!--import { Step } from "../../../common/types/Step";-->
<!--import { stepsByPracticeDate } from "@/store";-->

<!--@Component({-->
<!--  components: {-->
<!--    AllStepsProvider,-->
<!--    Container,-->
<!--    Feed-->
<!--  }-->
<!--})-->
<!--export default class HistoricalSessionView extends VueWithStore {-->
<!--  @Prop({ type: [String, Number] }) private sessionDate!: string | number;-->

<!--  get stepsInSession(): Step[] {-->
<!--    return stepsByPracticeDate(this.$store)[Number(this.sessionDate)];-->
<!--  }-->
<!--}-->
<!--</script>-->

<!--<template>-->
<!--  <AllStepsProvider>-->
<!--    <Container class="pt-5 pb-10">-->
<!--      <Feed :steps="stepsInSession" />-->
<!--    </Container>-->
<!--  </AllStepsProvider>-->
<!--</template>-->
