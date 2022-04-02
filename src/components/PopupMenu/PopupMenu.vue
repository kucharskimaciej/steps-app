<script lang="ts">
import { defineComponent, ref } from "@vue/composition-api";
import PopupControlWrapper from "@/components/PopupMenu/PopupControlWrapper.vue";
import InlineModal from "@/components/Modal/InlineModal.vue";

const PopupMenu = defineComponent({
  components: {
    PopupControlWrapper,
    InlineModal
  },
  setup() {
    const popupOpen = ref(false);

    function openMenu() {
      popupOpen.value = true;
    }

    function closeMenu() {
      popupOpen.value = false;
    }

    return {
      popupOpen,
      openMenu,
      closeMenu,
      onItemClick: closeMenu
    };
  }
});

export default PopupMenu;
</script>

<template>
  <span>
    <slot name="toggle" :open="openMenu"></slot>

    <InlineModal
      v-if="popupOpen"
      :modal-style="$modalStyle.POPUP"
      @close-modal="closeMenu()"
    >
      <PopupControlWrapper @item-clicked="onItemClick()">
        <slot :close="closeMenu"></slot>
      </PopupControlWrapper>
    </InlineModal>
  </span>
</template>
