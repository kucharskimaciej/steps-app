<script>
// @todo
export default {};
</script>

<template>
  <span />
</template>
<!--<script lang="ts">-->
<!--import { Component } from "vue-property-decorator";-->
<!--import { VueWithStore } from "@/lib/vueWithStore";-->
<!--import Container from "@/components/Layout/Container.vue";-->
<!--import PureButton from "@/components/PureButton/PureButton.vue";-->
<!--import PureIcon from "@/components/PureIcon/PureIcon.vue";-->
<!--import { dispatchCreateSession, getSessions, getSteps } from "@/store";-->
<!--import { PracticeSession } from "../../../common/types/PracticeSession";-->
<!--import Sessions from "@/components/Sessions/Sessions.vue";-->
<!--import AllSessionsProvider from "@/components/Providers/AllSessionsProvider.vue";-->
<!--import AllStepsProvider from "@/components/Providers/AllStepsProvider";-->
<!--import HistoricalSessions from "@/components/HistoricalSessions/HistoricalSessions.vue";-->
<!--import { Step } from "../../../common/types/Step";-->

<!--@Component({-->
<!--  components: {-->
<!--    AllStepsProvider,-->
<!--    Container,-->
<!--    PureButton,-->
<!--    PureIcon,-->
<!--    Sessions,-->
<!--    AllSessionsProvider,-->
<!--    HistoricalSessions-->
<!--  }-->
<!--})-->
<!--export default class SessionsView extends VueWithStore {-->
<!--  creating = false;-->

<!--  async createSession() {-->
<!--    if (this.creating) {-->
<!--      return;-->
<!--    }-->

<!--    this.creating = true;-->
<!--    await dispatchCreateSession(this.$store, void 0);-->
<!--  }-->

<!--  get savedSessions(): PracticeSession[] {-->
<!--    return getSessions(this.$store);-->
<!--  }-->

<!--  get steps(): Step[] {-->
<!--    return getSteps(this.$store);-->
<!--  }-->
<!--}-->
<!--</script>-->

<!--<template>-->
<!--  <Container>-->
<!--    <header class="flex items-center">-->
<!--      <h1 class="font-heading text-2xl text-bold">-->
<!--        Sessions-->
<!--      </h1>-->

<!--      <aside class="ml-auto">-->
<!--        <PureButton @click="createSession">-->
<!--          <PureIcon type="add_box" class="mr-1" />-->
<!--          Add session-->
<!--        </PureButton>-->
<!--      </aside>-->
<!--    </header>-->

<!--    <section class="mt-5">-->
<!--      <h2 class="font-heading text-lg text-bold">Saved sessions</h2>-->
<!--      <AllSessionsProvider :always-fetch="true">-->
<!--        <Sessions :sessions="savedSessions" class="mt-3" />-->
<!--      </AllSessionsProvider>-->
<!--    </section>-->

<!--    <section class="mt-5">-->
<!--      <h2 class="font-heading text-lg text-bold">Past sessions</h2>-->
<!--      <AllStepsProvider>-->
<!--        <HistoricalSessions :steps="steps" class="mt-3" />-->
<!--      </AllStepsProvider>-->
<!--    </section>-->
<!--  </Container>-->
<!--</template>-->
