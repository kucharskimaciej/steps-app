<script lang="ts">
import { Vue, Component, Emit } from "vue-property-decorator";

type FileEventTarget = EventTarget & { files: FileList };

@Component
export default class FileInput extends Vue {
  @Emit()
  fileSelected(event: InputEvent) {
    const file = (event.target as FileEventTarget).files[0];
    this.clear(); // clear to enable uploading the same file twice
    return file;
  }

  private clear() {
    (this.$refs.input as HTMLInputElement).value = "";
  }
}
</script>

<template>
  <label>
    <input ref="input" v-bind="$attrs" type="file" @input="fileSelected" />
    <slot>Upload file</slot>
  </label>
</template>

<style lang="scss" scoped>
input {
  width: 0.1px;
  height: 0.1px;
  opacity: 0;
  overflow: hidden;
  position: absolute;
  z-index: -1;
}
</style>
