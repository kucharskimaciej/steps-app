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
import SearchOverlay from "@/components/SearchOverlay/SearchOverlay.vue";
import {
  ClearSearchFn,
  GetSearchFn,
  SetSearchFn
} from "@/components/SearchOverlay/types";

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

  [MODALS.SEARCH_OVERLAY](props: {
    getSearch: GetSearchFn;
    setSearch: SetSearchFn;
    clearSearch: ClearSearchFn;
  }) {
    return {
      component: SearchOverlay,
      options: this.ensureDefaults({
        props
      })
    };
  }

  private ensureDefaults(options?: Partial<ModalOptions>): ModalOptions {
    return defaults(options, {
      style: MODAL_STYLE.OVERLAY
    });
  }
}
