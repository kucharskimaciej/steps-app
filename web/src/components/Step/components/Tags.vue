<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { Step, TagCategory } from "../../../../../common/types/Step";
import PureTag from "@/components/Tags/PureTag.vue";

@Component({
  components: {
    PureTag
  }
})
export default class Tags extends Vue {
  @Prop() private step!: Step;
  @Prop({ default: "all", type: String }) category!: TagCategory;
}
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
