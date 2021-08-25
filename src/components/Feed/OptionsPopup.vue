<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { Location } from "vue-router";
import { Step } from "../../../common/types/Step";
import PopupMenuItem from "@/components/PopupMenu/PopupMenuItem.vue";
import PopupMenu from "@/components/PopupMenu/PopupMenu.vue";
import CopyToClipboard from "@/components/CopyToClipboard/CopyToClipboard.vue";
import { ROUTES } from "@/router";

@Component({
  components: {
    PopupMenu,
    PopupMenuItem,
    CopyToClipboard
  }
})
export default class OptionsPopup extends Vue {
  @Prop({ required: true }) private step!: Step;

  get editRoute(): Location {
    return {
      name: ROUTES.EDIT_STEP,
      params: {
        stepId: this.step.id
      }
    };
  }
}
</script>

<template>
  <PopupMenu>
    <template #toggle="toggleProps">
      <slot name="toggle" v-bind="toggleProps" />
    </template>

    <CopyToClipboard
      :value="step | shortLink($router)"
      class="ml-auto self-start"
    >
      <PopupMenuItem>
        Copy link
      </PopupMenuItem>
    </CopyToClipboard>

    <router-link v-slot="{ navigate }" :to="editRoute">
      <PopupMenuItem @click="navigate">
        Edit
      </PopupMenuItem>
    </router-link>

    <slot name="customOptions" />

    <PopupMenuItem>
      Cancel
    </PopupMenuItem>
  </PopupMenu>
</template>
