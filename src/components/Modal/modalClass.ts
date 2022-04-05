import { VueWithStore } from "@/lib/vueWithStore";
import { Emit } from "vue-property-decorator";
import { SetupContext } from "@vue/composition-api";

export abstract class ModalView extends VueWithStore {
  @Emit()
  close() {}
}

export function useModalView(ctx: SetupContext<any>) {
  return {
    close() {
      ctx.emit("close");
    }
  };
}
