import Vue, { CreateElement } from "vue";
import { Component, Emit, Prop } from "vue-property-decorator";
import { DebounceTime } from "@/lib/decorators/debouceTime";

@Component
export default class DimensionsObserver extends Vue {
  @Prop() private maxHeight!: boolean;

  private observer!: ResizeObserver;
  private height = 0;
  private width = 0;

  @DebounceTime(100)
  @Emit()
  change(dimensions: [number, number]) {
    return dimensions;
  }

  mounted() {
    this.observer = new ResizeObserver(([firstEntry]) => {
      const { clientHeight, clientWidth } = firstEntry.target;

      this.height =
        !this.maxHeight || clientHeight > this.height
          ? clientHeight
          : this.height;

      this.width = clientWidth;

      this.change([this.width, this.height]);
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
      return this.$scopedSlots.default({
        height: this.height,
        width: this.width
      });
    }

    return this.$slots.default;
  }
}
