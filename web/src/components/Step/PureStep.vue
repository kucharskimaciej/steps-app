<template>
    <article>
        <main class="mb-3">
            <a
                target="_blank"
                class="bg-gray-200 font-thin px-6 py-4 rounded w-full mb-1 inline-block truncate text-surfie-green hover:text-eastern-blue hover:bg-gray-100"
                :href="media.url"
                v-for="media in step.media"
            >
                <PureIcon type="ondemand_video" class="mr-2 text-gray-700" /> {{ media.url }}
            </a>
        </main>
        <header class="mb-10">
            <h1 class="text-4xl font-secondary leading-tight font-semibold">
                {{ step.name }}
            </h1>
        </header>

        <footer class="flex">
            <div class="w-1/2">
                <PureTag
                        class="mr-1 mt-1 inline-block"
                        v-for="tag in step.tags"
                        :tag="tag"
                        :key="tag.text"
                />
            </div>

            <ul class="w-1/2 list-none">
                <li v-if="step.last_practiced_at" :class="detailClasses">
                    <PureIcon type="timer" :class="detailIconClasses" />
                    <strong>Last practiced </strong> {{ step.last_practiced_at | smartDate }}
                </li>

                <li v-if="step.last_viewed_at" :class="detailClasses">
                    <PureIcon type="remove_red_eye" :class="detailIconClasses" />
                    <strong>Last viewed </strong> {{ step.last_viewed_at | smartDate }}
                </li>

                <li v-if="step.last_practiced_at" :class="detailClasses">
                    <PureIcon type="create" :class="detailIconClasses" />
                    <strong>Created</strong> {{ step.created_at | smartDate }}
                </li>
            </ul>
        </footer>
    </article>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Step } from "../../../../types/Step";
import PureTag from "../Tags/PureTag.vue";
import PureIcon from "@/components/PureIcon/PureIcon.vue";

@Component({
    components: {
        PureTag,
        PureIcon
    }
})
export default class PureStep extends Vue {
    @Prop() private readonly step!: Step;

    get detailClasses() {
        return "text-sm text-gray-700 mb-1"
    }

    get detailIconClasses() {
        return "text-wood-bark text-base mr-2"
    }
}
</script>
