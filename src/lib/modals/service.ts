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
import VideoModal from "@/components/VideoModal/VideoModal.vue";
import { VideoObject } from "../../../common/types/VideoObject";

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

  [MODALS.SESSION_CART]() {
    return {
      component: SessionCartModal,
      options: this.ensureDefaults()
    };
  }

  [MODALS.SINGLE_VIDEO](video: VideoObject) {
    return {
      component: VideoModal,
      options: this.ensureDefaults({
        props: { video },
        style: MODAL_STYLE.BORDERLESS
      })
    };
  }

  private ensureDefaults(options?: Partial<ModalOptions>): ModalOptions {
    return defaults(options, {
      style: MODAL_STYLE.OVERLAY
    });
  }
}
