<!--<script lang="ts">-->
<!--import { Vue, Component, Prop } from "vue-property-decorator";-->
<!--import { Location } from "vue-router";-->
<!--import PureIcon from "../PureIcon/PureIcon.vue";-->
<!--import { PracticeSession } from "../../../common/types/PracticeSession";-->
<!--import { ROUTES } from "@/router";-->
<!--import Card from "@/components/Card/Card.vue";-->

<!--@Component({-->
<!--  components: {-->
<!--    Card,-->
<!--    PureIcon-->
<!--  }-->
<!--})-->
<!--export default class SessionCard extends Vue {-->
<!--  @Prop({ required: true }) private session!: PracticeSession;-->

<!--  get route(): Location {-->
<!--    return {-->
<!--      name: ROUTES.SESSION,-->
<!--      params: {-->
<!--        sessionId: this.session.id-->
<!--      }-->
<!--    };-->
<!--  }-->
<!--}-->
<!--</script>-->

<!--<template>-->
<!--  <Card>-->
<!--    <router-link v-slot="{ navigate }" :to="route">-->
<!--      <main @click="navigate">-->
<!--        <header class="font-heading text-lg">-->
<!--          {{ session.name }}-->
<!--        </header>-->
<!--        <section class="text-sm text-gray-500 font-thin mt-2 flex items-end">-->
<!--          {{ session.steps.length }} steps-->
<!--        </section>-->
<!--      </main>-->
<!--    </router-link>-->
<!--  </Card>-->
<!--</template>-->

<script>
export default {};
</script>
<template><span></span></template>
