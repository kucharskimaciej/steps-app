<script lang="ts">
import { Vue, Component, Emit } from "vue-property-decorator";
import Close from "@/components/Modal/Close.vue";

@Component({
  components: {
    Close
  }
})
export default class Overlay extends Vue {
  @Emit()
  close() {}
}
</script>

<template>
  <main>
    <slot />
    <Close @click="close()" />
  </main>
</template>
