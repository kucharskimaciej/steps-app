<script lang="ts">
import { Component, Prop } from "vue-property-decorator";
import { keys } from "lodash";
import { Step } from "../../../../common/types/Step";
import Card from "@/components/Card/Card.vue";
import { VueWithStore } from "@/lib/vueWithStore";
import { stepsByPracticeDate } from "@/store";

@Component({
  components: {
    Card
  }
})
export default class HistoricalSessions extends VueWithStore {
  @Prop() private steps!: Step[];

  get groupedByDate(): Record<number, Step[]> {
    return stepsByPracticeDate(this.$store);
  }

  get recordedPracticeDates(): number[] {
    return keys(this.groupedByDate)
      .map(Number)
      .sort((a, b) => b - a);
  }
}
</script>

<template>
  <section>
    <main class="flex flex-wrap items-stretch desktop:-mx-2">
      <div
        v-for="practiceDate in recordedPracticeDates"
        :key="practiceDate"
        class="desktop:mx-2 mb-2 w-full desktop:w-4/12"
      >
        {{ practiceDate }}
        <router-link
          v-slot="{ navigate }"
          :to="{
            name: $routes.HISTORICAL_SESSION,
            params: { sessionDate: practiceDate }
          }"
        >
          <Card @click.native="navigate">
            Practice {{ practiceDate | date }}
            <section
              class="text-sm text-gray-500 font-thin mt-2 flex items-end"
            >
              {{ groupedByDate[practiceDate].length }} steps
            </section>
          </Card>
        </router-link>
      </div>
    </main>
  </section>
</template>
