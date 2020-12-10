import { Service } from "vue-typedi";
import {
  MODAL_STYLE,
  ModalDefinitionProvider,
  ModalOptions,
  ModalRef,
  MODALS
} from "@/lib/modals/modals";
import { uuid } from "@/lib/uuid";
import SessionCartModal from "@/components/SessionCartModal/SessionCartModal.vue";
import { defaults } from "lodash";

@Service()
export class ModalsService implements Record<MODALS, ModalDefinitionProvider> {
  createRef<TKey extends MODALS>(
    key: TKey,
    ...params: Parameters<ModalsService[TKey]>
  ): ModalRef {
    if (!this[key]) {
      throw new Error(`Modal ${key} is not defined`);
    }

    const definition = (this[key] as ModalDefinitionProvider)(...params);

    return {
      uuid: uuid(),
      ...definition
    };
  }

  [MODALS.SESSION_CART](foo: string) {
    return {
      component: SessionCartModal,
      options: this.ensureDefaults({
        props: { foo },
        style: MODAL_STYLE.DRAWER
      })
    };
  }

  [MODALS.SECOND_MODAL]() {
    return {
      component: SessionCartModal,
      options: this.ensureDefaults()
    };
  }

  private ensureDefaults(options?: Partial<ModalOptions>): ModalOptions {
    return defaults(options, {
      style: MODAL_STYLE.OVERLAY
    });
  }
}
