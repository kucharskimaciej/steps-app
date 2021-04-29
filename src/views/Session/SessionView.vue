<script lang="ts">
import { Component, Prop, Watch } from "vue-property-decorator";
import { first } from "lodash";
import { VueWithStore } from "@/lib/vueWithStore";
import PureButton from "@/components/PureButton/PureButton.vue";
import PureIcon from "@/components/PureIcon/PureIcon.vue";
import { PracticeSession } from "../../../common/types/PracticeSession";
import Sessions from "@/components/Sessions/Sessions.vue";
import SessionProvider from "@/components/Providers/SessionProvider.vue";
import AllStepsProvider from "@/components/Providers/AllStepsProvider";
import WideWithSidebarRight from "@/components/Layout/WideWithSidebarRight.vue";
import {
  getSteps,
  stepsById,
  dispatchOpenModal,
  dispatchAddStep,
  dispatchRemoveStep,
  dispatchUpdateSession,
  dispatchRemoveSession
} from "@/store";
import Container from "@/components/Layout/Container.vue";
import { MODALS } from "@/lib/modals/modals";
import FullWithSidebar from "@/components/Layout/FullWithSidebar.vue";
import { Step } from "../../../common/types/Step";
import ReadonlyStep from "@/components/Step/ReadonlyStep.vue";
import ContentBox from "@/components/ContentBox/ContentBox.vue";
import Card from "@/components/Card/Card.vue";
import StepTitle from "@/components/Step/components/StepTitle.vue";
import SelectToggleWidget from "@/components/SelectToggleWidget/SelectToggleWidget.vue";

@Component({
  components: {
    SelectToggleWidget,
    StepTitle,
    Card,
    AllStepsProvider,
    SessionProvider,
    WideWithSidebarRight,
    FullWithSidebar,
    ReadonlyStep,
    Container,
    PureButton,
    PureIcon,
    Sessions,
    ContentBox
  }
})
export default class SessionView extends VueWithStore {
  @Prop() private sessionId!: string;

  activeStepId = "";

  private hasStepWatcherRun = false;

  @Watch("steps")
  handleStepsChange(steps: Step[]) {
    if (!this.hasStepWatcherRun) {
      this.activeStepId = first(steps)?.id || "";
      this.hasStepWatcherRun = true;
    }
  }

  private hasSessionWatcherRun = false;

  @Watch("session")
  handleSessionChange(session: PracticeSession) {
    if (!this.hasSessionWatcherRun && session) {
      this.hasSessionWatcherRun = true;
      if (session.steps.length > 0 && !this.$match("desktop")) {
        this.openCart();
        this.hasSessionWatcherRun = true;
      }
    }
  }

  get activeStep(): Step | null {
    if (this.activeStepId) {
      return stepsById(this.$store)[this.activeStepId];
    } else {
      return null;
    }
  }

  get steps() {
    return getSteps(this.$store);
  }

  get session(): PracticeSession {
    return this.$store.state.selectedSession.session!;
  }

  get stepsInSession() {
    if (!this.session) {
      return null;
    }

    return this.steps.filter(step => this.session.steps.includes(step.id));
  }

  openCart() {
    dispatchOpenModal(this.$store, {
      modal: MODALS.SESSION_CART,
      params: []
    });
  }

  private isInSession(stepId: string): boolean {
    return this.session.steps.includes(stepId);
  }

  isStepActive(step: Step) {
    return this.activeStepId === step.id;
  }

  isStepSelected(step: Step) {
    return this.isInSession(step.id);
  }

  onStepSelectToggle(stepId: string) {
    if (this.isInSession(stepId)) {
      dispatchRemoveStep(this.$store, stepId);
    } else {
      dispatchAddStep(this.$store, stepId);
    }
  }

  onActiveStepChange(stepId: string) {
    this.activeStepId = stepId;
  }

  handleClear() {
    dispatchUpdateSession(this.$store, { steps: [] });
  }

  handleRemoveSession() {
    dispatchRemoveSession(this.$store);
  }
}
</script>

<template>
  <SessionProvider :id="sessionId">
    <template #default>
      <FullWithSidebar v-if="session && session.status === 'open'">
        <template #sidebar>
          <AllStepsProvider>
            <div class="h-screen desktop:h-full flex flex-col">
              <ContentBox class="border-r">
                <PureButton feel="ghost" @click="openCart">
                  Session feed
                </PureButton>
              </ContentBox>
              <ContentBox
                class="border-r border-t h-full mb-auto flex-shrink"
                overflow="scroll"
              >
                <Card
                  v-for="step in steps"
                  :key="step.id"
                  class="mb-1"
                  allow-active
                  :active="isStepActive(step)"
                  @toggle-active="onActiveStepChange(step.id)"
                >
                  <template #prefix>
                    <SelectToggleWidget
                      :selected="isStepSelected(step)"
                      @toggle="onStepSelectToggle(step.id)"
                    />
                  </template>
                  <StepTitle :step="step" />
                </Card>
              </ContentBox>

              <ContentBox class="border border-l-0 border-b-0">
                <div class="flex items-center">
                  <span>{{ session.steps.length }} selected</span>
                  <span class="ml-auto">
                    <PureButton feel="ghost" @click="handleClear"
                      >Clear</PureButton
                    >
                  </span>
                </div>
              </ContentBox>
            </div>
          </AllStepsProvider>
        </template>

        <template #default>
          <div class="h-screen desktop:h-full flex flex-col">
            <ContentBox class="border-b">
              <div v-if="session" class="flex items-center">
                <h1>{{ session.name }}</h1>
                <aside class="ml-auto">
                  <PureButton feel="ghost">
                    <PureIcon />
                  </PureButton>
                  <PureButton feel="ghost" @click="handleRemoveSession">
                    Remove session
                  </PureButton>
                </aside>
              </div>
            </ContentBox>
            <ContentBox class="border-0 h-full w-full">
              <ReadonlyStep v-if="activeStep" :step="activeStep" />
            </ContentBox>
          </div>
        </template>
      </FullWithSidebar>
    </template>
  </SessionProvider>
</template>
