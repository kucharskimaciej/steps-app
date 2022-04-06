import { PropType } from "vue";

export const intersectComponentPropsType = {
  viewportRoot: {
    type: Object as PropType<HTMLElement | null>,
    default: null,
  },
  threshold: {
    type: Array as PropType<number[]>,
    default: () => [0, 0.2],
  },
};
