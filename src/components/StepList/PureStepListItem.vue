<script lang="ts">
import { computed, defineComponent, PropType } from "@vue/composition-api";
import Tags from "@/components/Step/components/Tags.vue";
import PureTag from "@/components/Tags/PureTag.vue";
import PureToggleButton from "@/components/PureToggleButton/PureToggleButton.vue";
import PureButton from "@/components/PureButton/PureButton.vue";
import PureIcon from "@/components/PureIcon/PureIcon.vue";
import CopyToClipboard from "@/components/CopyToClipboard/CopyToClipboard.vue";
import { Step } from "../../../common/types/Step";

const PureStepListItem = defineComponent({
  components: {
    Tags,
    PureTag,
    PureToggleButton,
    PureButton,
    PureIcon,
    CopyToClipboard
  },
  props: {
    step: {
      type: Object as PropType<Step>,
      required: true
    },
    isSelected: Boolean
  },
  setup({ step }) {
    const primaryVideoUrl = computed(() => step.videos[0].url);
    const restVideoUrls = computed(() => {
      const [, ...restVideos] = step.videos || [];
      return restVideos.map(video => video.url);
    });

    const hasMoreVideos = computed(() => step.videos.length > 1);
    const hasVariations = computed(() => step.variations.length > 1);

    const lastPracticeDate = computed(() => step.practice_records?.[0]?.date);

    return {
      primaryVideoUrl,
      restVideoUrls,
      hasMoreVideos,
      hasVariations,
      lastPracticeDate,
      detailClasses: "text-sm text-gray-700 mb-1",
      detailIconClasses: "mr-2 text-lg"
    };
  }
});

export default PureStepListItem;
</script>

<template>
  <article
    :id="`step-${step.identifier}`"
    class="p-4 bg-mono-white rounded flex items-start"
    :class="{
      'border-white border': !isSelected,
      'border-green-base border-2': isSelected
    }"
  >
    <main class="w-full">
      <header class="flex items-start">
        <h2 class="font-heading text-mono-100 font-normal mr-auto">
          <a
            :href="primaryVideoUrl"
            target="_blank"
            referrerpolicy="no-referrer"
            class="focus:outline-none focus:bg-yellow-base"
          >
            <aside class="mr-1 inline font-bold">#{{ step.identifier }}</aside>
            {{ step.name }}
          </a>
        </h2>

        <aside class="flex flex-shrink-0 ml-4">
          <router-link v-slot="{ navigate }" :to="`/edit/${step.id}`">
            <PureButton kind="ghost" class="mr-2" @click.native="navigate">
              <PureIcon type="edit" /> Edit
            </PureButton>
          </router-link>
        </aside>
      </header>
      <section v-if="hasMoreVideos">
        <PureButton
          v-for="(url, index) in restVideoUrls"
          :key="url"
          :href="url"
          target="_blank"
          referrerpolicy="no-referrer"
          tag="a"
          size="small"
          kind="secondary"
          class="mr-2"
        >
          Video {{ index + 2 }}
        </PureButton>
      </section>
      <section v-if="step.notes" class="mt-2">
        <p>{{ step.notes }}</p>
      </section>
      <section class="mt-4 flex">
        <div class="w-1/2">
          <Tags :step="step" />
        </div>

        <ul class="w-1/2 list-none">
          <li v-if="step.created_at" :class="detailClasses">
            <PureIcon type="date_range" :class="detailIconClasses" />
            <strong>Created</strong>
            {{ step.created_at | smartDate }}
          </li>

          <li v-if="lastPracticeDate" :class="detailClasses">
            <PureIcon type="timer" :class="detailIconClasses" />
            <strong>Last practiced </strong>
            {{ lastPracticeDate | smartDate }}
          </li>
        </ul>
      </section>
      <section v-if="hasVariations" class="text-sm text-gray-700 mt-3">
        <h2 class="font-semibold">
          Variations
        </h2>
        <a
          v-for="variation in step.variations"
          :key="variation.id"
          :href="`#step-${variation.identifier}`"
          class="block"
        >
          <strong>#{{ variation.identifier }}</strong> {{ variation.name }}
        </a>
      </section>

      <section class="mt-3 text-sm">
        Shortlink:
        <CopyToClipboard :value="step | shortLink($router)">
          {{ step | shortLink($router) }}
        </CopyToClipboard>
      </section>
    </main>
  </article>
</template>
