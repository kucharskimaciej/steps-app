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
        </section>
      </main>
    </router-link>
  </article>
</template>
