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
        @Prop() private selectedStepId!: string;

        @Emit()
        selectStep(stepId: string) {}
    }
</script>

<template>
    <section class="h-full overflow-y-auto overflow-x-hidden">
        <PureStepListItem class="mb-2 hover:bg-gray-100 hover:rounded"
                          @click.native="selectStep(step.document_id)"
                          :class="{ 'bg-gray-200 rounded': step.document_id === selectedStepId }"
                          v-for="step in steps" :step="step" :key="step.id" />
    </section>
</template>
