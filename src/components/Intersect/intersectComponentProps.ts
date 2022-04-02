import Vue from "vue";
import { Prop } from "vue-property-decorator";
import { PropType } from "@vue/composition-api";

export abstract class IntersectComponentProps extends Vue {
  @Prop({ default: null, type: HTMLElement }) viewportRoot!: HTMLElement | null;
  @Prop({ default: () => [0, 0.2] }) threshold!: number[];
}

export const intersectComponentPropsType = {
  viewportRoot: {
    type: Object as PropType<HTMLElement | null>,
    default: null
  },
  threshold: {
    type: Array as PropType<number[]>,
    default: () => [0, 0.2]
  }
};
