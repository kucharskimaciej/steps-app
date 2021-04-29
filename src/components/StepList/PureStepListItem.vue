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
            :href="firstVideoUrl"
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
      <section v-if="hasMoreVideos">
        <PureButton
          v-for="(url, index) in restVideoUrls"
          :key="url"
          :href="url"
          target="_blank"
          referrerpolicy="no-referrer"
          tag="a"
          size="small"
          feel="ghost"
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

          <li v-if="step.last_practiced_at" :class="detailClasses">
            <PureIcon type="timer" :class="detailIconClasses" />
            <strong>Last practiced </strong>
            {{ step.last_practiced_at | smartDate }}
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
        Shortlink: <CopyToClipboard :value="step | shortLink($router)" />
      </section>
    </main>
  </article>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue } from "vue-property-decorator";
import { Step } from "../../../common/types/Step";
import PureTag from "@/components/Tags/PureTag.vue";
import PureToggleButton from "@/components/PureToggleButton/PureToggleButton.vue";
import PureButton from "@/components/PureButton/PureButton.vue";
import PureIcon from "@/components/PureIcon/PureIcon.vue";
import CopyToClipboard from "@/components/CopyToClipboard/CopyToClipboard.vue";
import Tags from "@/components/Step/components/Tags.vue";

@Component({
  components: {
    Tags,
    PureTag,
    PureToggleButton,
    PureButton,
    PureIcon,
    CopyToClipboard
  }
})
export default class PureStepListItem extends Vue {
  @Prop() private step!: Step;
  @Prop({ default: false }) private isSelected!: boolean;

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

  get firstVideoUrl(): string {
    const [firstVideo] = this.step.videos;
    return firstVideo.url;
  }

  get restVideoUrls(): string[] {
    const [, ...restVideos] = this.step.videos;
    return restVideos.map(video => video.url);
  }

  get hasMoreVideos(): boolean {
    return this.restVideoUrls.length > 0;
  }

  get hasVariations(): boolean {
    return this.step.variations.length > 0;
  }
}
</script>
