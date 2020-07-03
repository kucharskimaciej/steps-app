import Vue, { VueConstructor } from "vue";
import { Store } from "vuex";
import { RootState } from "@/store/types";

abstract class VueWithStoreClass extends Vue {
  public $store!: Store<RootState>;
}

export const VueWithStore = Vue as VueConstructor<VueWithStoreClass>;
