<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import PureButton from "@/components/PureButton/PureButton.vue";
import PureIcon from "@/components/PureIcon/PureIcon.vue";

@Component({
    components: { PureButton, PureIcon }
})
export default class PureToggleButton extends Vue {
    @Prop() private toggled!: boolean;
}
</script>

<template>
    <PureButton kind="success" :feel="toggled ? 'regular' : 'ghost'" size="large">
        <PureIcon type="check" class="text-3xl" />
    </PureButton>
</template>
