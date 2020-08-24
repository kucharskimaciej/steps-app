<script lang="ts">
import { Component, Prop } from "vue-property-decorator";
import { VueWithStore } from "@/lib/vueWithStore";
import PureButton from "@/components/PureButton/PureButton.vue";
import PureIcon from "@/components/PureIcon/PureIcon.vue";
import { PracticeSession } from "../../../../common/types/PracticeSession";
import Sessions from "@/components/Sessions/Sessions.vue";
import SessionProvider from "@/components/Providers/SessionProvider.vue";
import AllStepsProvider from "@/components/Providers/AllStepsProvider.vue";
import WideWithSidebarRight from "@/components/Layout/WideWithSidebarRight.vue";
import Feed from "@/components/Feed/Feed.vue";
import { getSteps } from "@/store";
import PureStepList from "@/components/StepList/PureStepList.vue";
import Container from "@/components/Layout/Container.vue";

@Component({
  components: {
    Feed,
    PureStepList,
    AllStepsProvider,
    SessionProvider,
    WideWithSidebarRight,
    Container,
    PureButton,
    PureIcon,
    Sessions
  }
})
export default class SessionView extends VueWithStore {
  @Prop() private sessionId!: string;

  get session(): PracticeSession {
    return this.$store.state.selectedSession.session!;
  }

  get stepsNotInSession() {
    if (!this.session) {
      return null;
    }

    return getSteps(this.$store).filter(
      step => !this.session.steps.includes(step.id)
    );
  }

  get stepsInSession() {
    if (!this.session) {
      return null;
    }

    return getSteps(this.$store).filter(step =>
      this.session.steps.includes(step.id)
    );
  }
}
</script>

<template>
  <SessionProvider :id="sessionId">
    <WideWithSidebarRight v-if="session.status === 'open'">
      <template #default>
        <AllStepsProvider>
          <Feed :steps="stepsInSession" />
        </AllStepsProvider>
      </template>

      <template #sidebar>
        <AllStepsProvider>
          <PureStepList :steps="stepsNotInSession" />
        </AllStepsProvider>
      </template>
    </WideWithSidebarRight>
    <Container v-else>
      <AllStepsProvider>
        <Feed :steps="stepsInSession" />
      </AllStepsProvider>
    </Container>
  </SessionProvider>
</template>
