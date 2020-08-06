<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { PracticeSession } from "../../../../common/types/PracticeSession";
import SessionCard from "./SessionCard.vue";

@Component({
  components: {
    SessionCard
  }
})
export default class Sessions extends Vue {
  @Prop() private sessions!: PracticeSession[];
}
</script>

<template>
  <main class="flex flex-wrap items-stretch">
    <SessionCard
      v-for="session in sessions"
      :key="session.id"
      :session="session"
      class="mx-3 mb-3 w-full sm:w-4/12"
    />
  </main>
</template>
