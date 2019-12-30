<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { getModule } from "vuex-module-decorators";
import { StepsModule } from "@/store/modules/steps";
import PureStepList from "@/components/StepList/PureStepList.vue";
import Container from "@/components/Layout/Container.vue";
import { CurrentUserModule } from "@/store/modules/currentUser";

@Component({
    components: {
        Container,
        PureStepList
    }
})
export default class Steps extends Vue {
    steps = getModule(StepsModule, this.$store);
    currentUser = getModule(CurrentUserModule, this.$store);

    isSelected = (stepId: string) => stepId in this.currentUser.practiceSteps;

    async handleStepSelected(stepId: string) {
        await this.currentUser.toggleStepPractice(stepId);
    }
}
</script>

<template>
    <Container>
        <PureStepList
            :steps="steps.steps"
            :is-selected="isSelected"
            @select="handleStepSelected"
        />
    </Container>
</template>
