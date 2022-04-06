import { VideoObject } from "../../../common/types/VideoObject";
import { computed, defineComponent, PropType, watch } from "vue";

const ProvideScaledVideoSize = defineComponent({
  props: {
    video: { required: true, type: Object as PropType<VideoObject> },
    targetWidth: Number,
    defaultHeight: {
      type: Number,
      default: 400
    }
  },
  emits: ["updatedHeight"],
  setup(props, { emit, slots }) {
    const scaledVideoHeight = computed(() => {
      const { height, width } = props.video;
      if (!height || !width || !props.targetWidth) {
        return props.defaultHeight;
      }

      const scaleRatio = props.targetWidth / width;
      return scaleRatio * height;
    });

    watch(
      () => scaledVideoHeight.value,
      () => {
        emit("updatedHeight", scaledVideoHeight.value);
      },
      { immediate: true }
    );

    return () =>
      slots.default?.({ scaledVideoHeight: scaledVideoHeight.value });
  }
});
export default ProvideScaledVideoSize;
