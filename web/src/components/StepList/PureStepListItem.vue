<template>
    <div class="px-4 py-3 cursor-pointer">
        <h2 class="truncate font-secondary text-wood-bark font-light">
            <aside class="mr-1 inline font-bold">#{{ step.id }}</aside>
            {{ step.name }}
        </h2>
        <footer class="mt-2" v-if="hasTags">
            <PureTag
                class="mr-1 mt-1 inline-block"
                v-for="tag in step.tags"
                :tag="tag"
                :key="tag.text"
            />
        </footer>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Step } from "../../../../types/Step";
import PureTag from "@/components/Tags/PureTag.vue";

@Component({
    components: {
        PureTag
    }
})
export default class PureStepListItem extends Vue {
    @Prop() private step!: Step;

    get hasTags() {
        return this.step.tags && this.step.tags.length;
    }
}
</script>
