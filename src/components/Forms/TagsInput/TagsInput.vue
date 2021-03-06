<script lang="ts">
import {
  Vue,
  Component,
  Prop,
  Emit,
  InjectReactive
} from "vue-property-decorator";
import VueTagsInput from "@johmun/vue-tags-input";
import { Tag } from "../../../../common/types/Tag";

@Component({
  components: {
    VueTagsInput
  }
})
export default class TagsInput extends Vue {
  @Prop() private readonly value!: string[];
  @Prop({ default: () => [] }) private readonly autocomplete!: string[];
  @Prop({ default: true }) private allowNew!: boolean;

  inputValue = "";

  @InjectReactive({ from: "hasError", default: false }) hasError!: boolean;

  @Emit("input")
  handleTagsChanged(tags: Tag[]): string[] {
    return tags.map(t => t.text);
  }

  get filteredItems(): string[] | null {
    if (!this.autocomplete) {
      return null;
    }

    const query = this.inputValue.toLowerCase();
    return this.autocomplete.filter(tag => tag.toLowerCase().includes(query));
  }

  asTags(items: string[] = []): Tag[] {
    return items.map(text => ({ text }));
  }
}
</script>

<template>
  <VueTagsInput
    v-model="inputValue"
    class="tags-input"
    :class="{ invalid: hasError }"
    :tags="asTags(value)"
    :autocomplete-items="asTags(filteredItems)"
    :add-only-from-autocomplete="!allowNew"
    placeholder="+ Add tag"
    @tags-changed="handleTagsChanged"
  />
</template>

<style lang="scss">
.tags-input.vue-tags-input {
  @apply bg-gray-100 max-w-full w-full font-light bg-gray-200 outline-none rounded px-3 py-2 border border-gray-200 text-base;

  &.invalid {
    @apply border-red-light text-red-lighter #{!important};
  }

  &.ti-focus {
    @apply bg-white shadow border-gray-100;
  }

  &.invalid {
    @apply border-gray-200 text-base;
  }

  .ti-input {
    @apply border-0 p-0 bg-transparent;
  }

  .ti-new-tag-input {
    @apply bg-transparent font-light text-base;
  }

  .ti-new-tag-input-wrapper {
    @apply m-0 px-0 pb-px pt-1;
  }

  .ti-tags {
    @apply -mt-1;
  }

  .ti-tag {
    @apply bg-gray-300 text-gray-700 pl-3 pr-2 py-1 rounded-sm text-xs my-0 mt-1 mr-2 -ml-1;

    .ti-content {
      @apply mr-2;
    }

    &.ti-deletion-mark {
      @apply bg-red-light text-white;
    }
  }

  .ti-autocomplete {
    @apply -ml-3 mt-3 border-0 shadow rounded;

    .ti-item {
      @apply px-3 py-1 rounded;

      &:hover,
      &.ti-selected-item {
        @apply bg-yellow-light;
      }
    }
  }
}
</style>
