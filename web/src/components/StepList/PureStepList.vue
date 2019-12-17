<script lang="ts">
    import { Component, Prop, Vue, Emit } from 'vue-property-decorator';
    import PureStepListItem from "@/components/StepList/PureStepListItem.vue";
    import { Step } from "../../../../types/Step";

    @Component({
        components: {
            PureStepListItem
        }
    })
    export default class PureStepList extends Vue {
        @Prop() private steps!: Step[];

        @Emit()
        addStepToPractice(stepId: string) {}
    }
</script>

<template>
    <section class="h-full overflow-y-auto overflow-x-hidden pr-4">
        <PureStepListItem class="mb-2"
                          v-for="step in steps" :step="step" :key="step.id" />
    </section>
</template>
