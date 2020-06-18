<script lang="ts">
import { Vue, Component, Prop, Emit } from "vue-property-decorator";
import PureButton from "@/components/PureButton/PureButton.vue";
import PureIcon from "@/components/PureIcon/PureIcon.vue";

@Component({
  components: {
    PureButton,
    PureIcon
  }
})
export default class Video extends Vue {
  @Prop() private title!: string;
  @Prop() private filename!: string;
  @Prop() private url!: string;

  @Emit()
  remove() {}
}
</script>

<template>
  <div class="py-2">
    <header class="flex text-sm items-center">
      <strong>{{ title }}</strong>
      <aside class="ml-auto text-sm">
        <PureButton tag="a" feel="ghost" :href="url" target="_blank">
          <PureIcon type="open_in_new" /> Open
        </PureButton>

        <PureButton kind="danger" feel="ghost" @click="remove()"
          >Delete</PureButton
        >
      </aside>
    </header>
    <p v-if="filename" class="font-light text-sm">
      Original filename: {{ filename }}
    </p>
  </div>
</template>
