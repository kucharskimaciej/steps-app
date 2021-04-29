import Vue from "vue";
import { Prop } from "vue-property-decorator";

export abstract class IntersectComponentProps extends Vue {
  @Prop({ default: null, type: HTMLElement }) viewportRoot!: HTMLElement | null;
  @Prop({ default: () => [0, 0.2] }) threshold!: number[];
}
