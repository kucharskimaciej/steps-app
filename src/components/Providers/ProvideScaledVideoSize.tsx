import { Component, Emit, Prop, Vue, Watch } from "vue-property-decorator";
import { VideoObject } from "../../../common/types/VideoObject";
import {
  computed,
  defineComponent,
  PropType,
  watch
} from "@vue/composition-api";

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
  setup({ video, targetWidth, defaultHeight }, { emit, slots }) {
    const scaledVideoHeight = computed(() => {
      const { height, width } = video;
      if (!height || !width || !targetWidth) {
        return defaultHeight;
      }

      const scaleRatio = targetWidth / width;
      return scaleRatio * height;
    });

    watch(scaledVideoHeight, () => {
      emit("updatedHeight");
    });

    return () => slots.default?.({ scaledVideoHeight });
  }
});
export default ProvideScaledVideoSize;
