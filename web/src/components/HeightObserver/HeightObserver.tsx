import Vue, { CreateElement } from "vue";
import { Component, Emit, Prop } from "vue-property-decorator";
import { DebounceTime } from "@/lib/decorators/debouceTime";

@Component
export default class HeightObserver extends Vue {
  @Prop() private maxHeight!: boolean;

  private observer!: ResizeObserver;
  private height = 0;

  @DebounceTime(100)
  @Emit()
  change(height: number) {
    this.height = height;
    return this.height;
  }

  mounted() {
    this.observer = new ResizeObserver(([firstEntry]) => {
      const detectedHeight = firstEntry.target.clientHeight;

      if (!this.maxHeight || detectedHeight > this.height) {
        this.change(detectedHeight);
      }
    });

    this.$nextTick(() => {
      this.observer.observe(this.$el);
    });
  }

  destroyed() {
    this.observer.disconnect();
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  render(h: CreateElement) {
    if (this.$scopedSlots.default) {
      return this.$scopedSlots.default({ height: this.height });
    }

    return this.$slots.default;
  }
}
