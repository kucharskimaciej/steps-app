<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import PureIcon from "@/components/PureIcon/PureIcon.vue";

@Component({
  components: {
    PureIcon
  }
})
export default class Close extends Vue {}
</script>

<template>
  <aside
    v-bind="$attrs"
    class="absolute top-0 right-0 mt-4 mr-4 text-3xl leading-0 cursor-pointer transition-all transform scale-1 hover:scale-110"
    v-on="$listeners"
  >
    <PureIcon type="close" />
  </aside>
</template>
