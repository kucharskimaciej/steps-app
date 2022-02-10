<script lang="ts">
import ProvideScaledVideoSize from "@/components/Providers/ProvideScaledVideoSize";
import { Vue, Component, Prop } from "vue-property-decorator";
import { DynamicScroller, DynamicScrollerItem } from "vue-virtual-scroller";
import FeedStep from "./FeedStep.vue";
import { Step } from "../../../common/types/Step";

@Component({
  components: {
    DynamicScroller,
    DynamicScrollerItem,
    FeedStep,
    ProvideScaledVideoSize
  }
})
export default class Feed extends Vue {
  @Prop({ required: true }) private steps!: Step[];
  @Prop() private pageMode!: boolean;

  width = 0;
  mounted() {
    this.width = this.$el.clientWidth;
  }

  stepVideoHeight: Record<string, number> = {};
}
</script>

<template>
  <main>
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
            <template #default="{scaledVideoHeight}">
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
