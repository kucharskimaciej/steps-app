<template>
    <article
        class="p-4 bg-white rounded flex items-start"
        :class="{
            'border-white border': !isSelected,
            'border-green-base border-2': isSelected
        }"
    >
        <PureToggleButton
            :toggled="isSelected"
            class="mr-4"
            @click.native="select()"
        />
        <main class="w-full">
            <header class="flex items-start">
                <h2 class="font-secondary text-wood-bark font-light mr-auto">
                    <a
                        :href="step.url"
                        target="_blank"
                        referrerpolicy="no-referrer"
                        class="focus:outline-none focus:bg-yellow-base"
                    >
                        <aside class="mr-1 inline font-bold">
                            #{{ step.identifier }}
                        </aside>
                        {{ step.name }}
                    </a>
                </h2>

                <aside class="flex flex-shrink-0 ml-4">
                    <router-link :to="`/edit/${step.id}`" v-slot="{ navigate }">
                        <PureButton
                            feel="ghost"
                            kind="primary"
                            class="mr-2"
                            @click.native="navigate"
                        >
                            <PureIcon type="edit" /> Edit
                        </PureButton>
                    </router-link>
                </aside>
            </header>
            <section class="mt-4 flex">
                <div class="w-1/2">
                    <PureTag
                        class="mr-1 mt-1 inline-block"
                        v-for="tag in step.tags"
                        :tag="tag"
                        :key="tag.text"
                    />
                </div>

                <ul class="w-1/2 list-none">
                    <li v-if="step.created_at" :class="detailClasses">
                        <PureIcon
                            type="date_range"
                            :class="detailIconClasses"
                        />
                        <strong>Created</strong>
                        {{ step.created_at | smartDate }}
                    </li>

                    <li v-if="step.last_practiced_at" :class="detailClasses">
                        <PureIcon type="timer" :class="detailIconClasses" />
                        <strong>Last practiced </strong>
                        {{ step.last_practiced_at | smartDate }}
                    </li>
                </ul>
            </section>
        </main>
    </article>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue } from "vue-property-decorator";
import { Step } from "../../../../common/types/Step";
import PureTag from "@/components/Tags/PureTag.vue";
import PureToggleButton from "@/components/PureToggleButton/PureToggleButton.vue";
import PureButton from "@/components/PureButton/PureButton.vue";
import PureIcon from "@/components/PureIcon/PureIcon.vue";

@Component({
    components: {
        PureTag,
        PureToggleButton,
        PureButton,
        PureIcon
    }
})
export default class PureStepListItem extends Vue {
    @Prop() private step!: Step;
    @Prop() private isSelected!: boolean;

    @Emit()
    select() {}

    @Emit()
    edit() {}

    get detailClasses() {
        return "text-sm text-gray-700 mb-1";
    }

    get detailIconClasses() {
        return "mr-2 text-lg";
    }
}
</script>
