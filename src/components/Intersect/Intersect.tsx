import { CreateElement } from "vue";
import { Component, Emit } from "vue-property-decorator";
import { IntersectComponentProps } from "@/components/Intersect/intersectComponentProps";

@Component
export default class Intersect extends IntersectComponentProps {
  private observer!: IntersectionObserver;

  @Emit()
  change(entry: IntersectionObserverEntry) {
    return entry;
  }

  mounted() {
    this.observer = new IntersectionObserver(
      ([entry]) => {
        this.change(entry);
      },
      {
        threshold: this.threshold,
        root: this.viewportRoot
      }
    );

    this.$nextTick(() => {
      if (
        !this.$slots.default ||
        !this.$slots.default[0] ||
        !this.$slots.default[0].elm
      ) {
        console.warn("Must provide default slot element");
        return;
      }

      this.observer.observe(this.$slots.default[0].elm as Element);
    });
  }

  destroyed() {
    this.observer.disconnect();
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  render(h: CreateElement) {
    return this.$slots.default;
  }
}
