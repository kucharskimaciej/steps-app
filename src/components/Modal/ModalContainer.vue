<script lang="ts">
import { Component, Watch } from "vue-property-decorator";
import { PortalTarget } from "portal-vue";
import { VueWithStore } from "@/lib/vueWithStore";
import Backdrop from "@/components/Modal/Backdrop.vue";

@Component({
  components: {
    Backdrop,
    PortalTarget
  }
})
export default class ModalContainer extends VueWithStore {
  inlineModalOpen = false;

  @Watch("inlineModalOpen")
  handleTopModalChange(value: boolean) {
    if (value) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }
}
</script>

<template>
  <PortalTarget
    :class="{
      'z-20 relative': inlineModalOpen,
      hidden: !inlineModalOpen
    }"
    name="modal"
    multiple
    @change="inlineModalOpen = $event"
  />
</template>
