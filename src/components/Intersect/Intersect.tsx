import { intersectComponentPropsType } from "@/components/Intersect/intersectComponentProps";
import {
  defineComponent,
  onMounted,
  ref,
  nextTick,
  onBeforeUnmount,
} from "vue";

const Intersect = defineComponent({
  props: intersectComponentPropsType,
  emits: ["change"],
  setup({ threshold, viewportRoot }, { emit, slots }) {
    const observer = ref<IntersectionObserver>();
    const defaultSlot = ref();

    function onChange(entry: IntersectionObserverEntry) {
      emit("change", entry);
    }

    onMounted(async () => {
      observer.value = new IntersectionObserver(
        ([entry]) => {
          onChange(entry);
        },
        {
          threshold,
          root: viewportRoot,
        }
      );

      await nextTick();

      defaultSlot.value = slots.default?.();
      if (
        !defaultSlot.value ||
        !defaultSlot.value[0] ||
        !defaultSlot.value[0].elm
      ) {
        console.warn("Must provide default slot element");
        return;
      }

      observer.value.observe(defaultSlot.value[0].elm as Element);
    });

    onBeforeUnmount(() => {
      if (observer.value) {
        observer.value.disconnect();
      }
    });

    return () => defaultSlot.value;
  },
});

export default Intersect;
