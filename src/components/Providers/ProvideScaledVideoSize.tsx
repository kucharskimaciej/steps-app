import { PropType } from "vue";
import { Component, Emit, Prop, Vue, Watch } from "vue-property-decorator";
import { VideoObject } from "../../../common/types/VideoObject";

@Component
export default class ProvideScaledVideoSize extends Vue {
  @Prop({ required: true, type: Object as PropType<VideoObject> })
  video!: VideoObject;
  @Prop() targetWidth!: number;
  @Prop({ default: 400 }) defaultHeight!: number;

  get scaledVideoHeight(): number {
    const { height, width } = this.video;
    if (!height || !width || !this.targetWidth) {
      return this.defaultHeight;
    }

    const scaleRatio = this.targetWidth / width;
    return scaleRatio * height;
  }

  @Watch("scaledVideoHeight")
  @Emit()
  updatedHeight() {}

  render() {
    return this.$scopedSlots.default?.({
      scaledVideoHeight: this.scaledVideoHeight
    });
  }
}
