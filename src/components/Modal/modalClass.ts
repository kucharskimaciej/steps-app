import { VueWithStore } from "@/lib/vueWithStore";
import { Emit } from "vue-property-decorator";

export abstract class ModalView extends VueWithStore {
  @Emit()
  close() {}
}
