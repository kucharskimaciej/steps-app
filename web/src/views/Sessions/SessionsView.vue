<script lang="ts">
import { Component } from "vue-property-decorator";
import { VueWithStore } from "@/lib/vueWithStore";
import Container from "@/components/Layout/Container.vue";
import PureButton from "@/components/PureButton/PureButton.vue";
import PureIcon from "@/components/PureIcon/PureIcon.vue";
import { dispatchCreateSession, getSessions } from "@/store";
import { PracticeSession } from "../../../../common/types/PracticeSession";
import Sessions from "@/components/Sessions/Sessions.vue";
import AllSessionsProvider from "@/components/Providers/AllSessionsProvider.vue";

@Component({
  components: {
    Container,
    PureButton,
    PureIcon,
    Sessions,
    AllSessionsProvider
  }
})
export default class SessionsView extends VueWithStore {
  creating = false;

  async createSession() {
    if (this.creating) {
      return;
    }

    this.creating = true;
    await dispatchCreateSession(this.$store, void 0);
  }

  get sessions(): PracticeSession[] {
    return getSessions(this.$store);
  }
}
</script>

<template>
  <Container>
    <AllSessionsProvider :always-fetch="true">
      <header class="flex items-center">
        <h1 class="font-heading text-2xl text-bold">
          Sessions
        </h1>

        <aside class="ml-auto">
          <PureButton @click="createSession">
            <PureIcon type="add_box" class="mr-1" />
            Add session
          </PureButton>
        </aside>
      </header>

      <Sessions :sessions="sessions" class="mt-3" />
    </AllSessionsProvider>
  </Container>
</template>
