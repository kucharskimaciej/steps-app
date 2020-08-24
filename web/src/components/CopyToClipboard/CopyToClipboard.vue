<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import PureIcon from "@/components/PureIcon/PureIcon.vue";

@Component({
  components: {
    PureIcon
  }
})
export default class CopyToClipboard extends Vue {
  @Prop({ required: true }) private value!: string;

  copy() {
    navigator.clipboard.writeText(this.value);
  }
}
</script>

<template>
  <article
    class="inline-flex text-sm text-gray-700 cursor-pointer"
    @click="copy"
  >
    <slot>
      <span class="hover:underline">{{ value }}</span>
      <PureIcon class="self-center ml-1" type="content_copy" />
    </slot>
  </article>
</template>
