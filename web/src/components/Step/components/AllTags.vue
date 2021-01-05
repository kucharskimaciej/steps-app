<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { Step } from "../../../../../common/types/Step";
import PureTag from "@/components/Tags/PureTag.vue";

@Component({
  components: {
    PureTag
  }
})
export default class AllTags extends Vue {
  @Prop() private step!: Step;
}
</script>

<template>
  <section>
    <PureTag
      v-for="tag in step.tags"
      :key="tag.text"
      class="mr-1 mt-1 inline-block"
      :tag="tag"
    />
  </section>
</template>
