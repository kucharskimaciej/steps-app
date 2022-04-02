<script lang="ts">
import { defineComponent, PropType } from "@vue/composition-api";
import PureTag from "@/components/Tags/PureTag.vue";
import { Step, TagCategory } from "../../../../common/types/Step";

const Tags = defineComponent({
  components: {
    PureTag
  },
  props: {
    step: Object as PropType<Step>,
    category: {
      type: String as PropType<TagCategory>,
      default: "all"
    }
  }
});

export default Tags;
</script>

<template>
  <section>
    <PureTag
      v-for="tag in step.tags[category]"
      :key="tag.text"
      class="mr-1 mt-1 inline-block"
      :tag="tag"
    />
  </section>
</template>
