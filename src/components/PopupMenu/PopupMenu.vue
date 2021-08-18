<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import InlineModal from "@/components/Modal/InlineModal.vue";
import PopupControlWrapper from "@/components/PopupMenu/PopupControlWrapper.vue";

@Component({
  components: {
    PopupControlWrapper,
    InlineModal
  }
})
export default class PopupMenu extends Vue {
  popupOpen = false;

  openMenu() {
    this.popupOpen = true;
  }

  closeMenu() {
    this.popupOpen = false;
  }

  onItemClick() {
    this.closeMenu();
  }
}
</script>

<template>
  <span>
    <slot name="toggle" :open="openMenu"></slot>

    <InlineModal
      v-if="popupOpen"
      :modal-style="$modalStyle.POPUP"
      @close-modal="closeMenu"
    >
      <PopupControlWrapper @item-clicked="onItemClick">
        <slot :close="closeMenu"></slot>
      </PopupControlWrapper>
    </InlineModal>
  </span>
</template>
