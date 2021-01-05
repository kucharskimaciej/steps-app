<script lang="ts">
import { Vue, Component, Prop, Emit } from "vue-property-decorator";
import PureIcon from "@/components/PureIcon/PureIcon.vue";

@Component({
  components: {
    PureIcon
  }
})
export default class SelectToggleWidget extends Vue {
  @Prop() private selected!: boolean;

  @Emit()
  toggle() {}

  clickhandler() {
    console.log("click");
  }
}
</script>

<template>
  <label
    class="block leading-0 text-2xl cursor-pointer opacity-75 hover:opacity-100"
    @click.stop="() => {}"
  >
    <input
      type="checkbox"
      :checked="selected"
      class="hidden"
      @change.stop="toggle"
    />
    <PureIcon v-if="selected" type="check_box" />
    <PureIcon v-else type="check_box_outline_blank" />
  </label>
</template>
