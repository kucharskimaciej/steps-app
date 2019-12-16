<script lang="ts">
    import { Vue, Component, Emit } from "vue-property-decorator";

    @Component
    export default class PureStepActions extends Vue {
        @Emit()
        addStepToPractice() {}

        @Emit()
        removeStep() {}

        @Emit()
        editStep() {}
    }
</script>

<template>

</template>
