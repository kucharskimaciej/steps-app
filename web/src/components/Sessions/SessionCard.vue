<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { Location } from "vue-router";
import PureIcon from "../PureIcon/PureIcon.vue";
import { PracticeSession } from "../../../../common/types/PracticeSession";
import { ROUTES } from "@/router";

@Component({
  components: {
    PureIcon
  }
})
export default class SessionCard extends Vue {
  @Prop({ required: true }) private session!: PracticeSession;

  get route(): Location {
    return {
      name: ROUTES.SESSION,
      params: {
        sessionId: this.session.id
      }
    };
  }

  get isClosed() {
    return this.session.status === "closed";
  }
}
</script>

<template>
  <article class="bg-white p-3 rounded shadow-sm hover:shadow cursor-pointer">
    <router-link v-slot="{ navigate }" :to="route">
      <main @click="navigate">
        <header class="font-heading text-lg">
          {{ session.name }}
        </header>
        <section class="text-sm text-gray-500 font-thin mt-2 flex items-end">
          {{ session.steps.length }} steps
          <aside
            v-if="isClosed"
            class="text-green-base ml-auto flex items-center"
          >
            <PureIcon type="done" class="text-lg mr-px" />
            {{ session.closed_at | date }}
          </aside>
        </section>
      </main>
    </router-link>
  </article>
</template>
