<script lang="ts">
import { defineComponent, onMounted, PropType, reactive, ref } from "vue";
import { DynamicScroller, DynamicScrollerItem } from "vue-virtual-scroller";
import FeedStep from "@/features/Feed/FeedStep.vue";
import ProvideScaledVideoSize from "@/components/Providers/ProvideScaledVideoSize";
import { Step } from "../../../common/types/Step";

const Feed = defineComponent({
  components: {
    DynamicScroller,
    DynamicScrollerItem,
    FeedStep,
    ProvideScaledVideoSize
  },
  props: {
    steps: {
      type: Array as PropType<Step[]>,
      required: true
    },
    pageMode: Boolean
  },
  setup() {
    const rootEl = ref<HTMLElement>();
    const width = ref(0);
    const stepVideoHeight = reactive<Record<string, number>>({});

    onMounted(() => {
      width.value = rootEl.value?.clientWidth || 0;
    });

    return {
      rootEl,
      stepVideoHeight,
      width
    };
  }
});

export default Feed;
</script>

<template>
  <main ref="rootEl">
    <DynamicScroller
      :page-mode="pageMode"
      :items="steps"
      :buffer="600"
      :min-item-size="800"
    >
      <template #default="{ item, index, active }">
        <DynamicScrollerItem
          :item="item"
          :active="active"
          :data-index="index"
          :size-dependencies="[stepVideoHeight[item.id]]"
          :key-field="item.id"
        >
          <ProvideScaledVideoSize
            :video="item.videos[0]"
            :target-width="width"
            @updated-height="stepVideoHeight[item.id] = $event"
          >
            <template #default="{ scaledVideoHeight }">
              <div class="mb-4">
                <slot :step="item" :video-height="scaledVideoHeight">
                  <FeedStep :step="item" :video-height="scaledVideoHeight" />
                </slot>
              </div>
            </template>
          </ProvideScaledVideoSize>
        </DynamicScrollerItem>
      </template>
    </DynamicScroller>
  </main>
</template>
