<script lang="ts">
import { defineComponent, ref } from "@vue/composition-api";

type FileEventTarget = EventTarget & { files: FileList };

const FileInput = defineComponent({
  emits: ["file-selected"],
  setup(_, { emit }) {
    const input = ref<HTMLInputElement>();

    function clear() {
      if (!input.value) {
        return;
      }

      input.value.value = "";
    }

    function fileSelected(event: InputEvent) {
      const file = (event.target as FileEventTarget).files[0];
      clear(); // clear to enable uploading the same file twice
      emit("file-selected", file);
    }

    return {
      input,
      fileSelected
    };
  }
});

export default FileInput;
</script>

<template>
  <label>
    <input
      ref="input"
      v-bind="$attrs"
      type="file"
      @input="fileSelected($event)"
    />
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
