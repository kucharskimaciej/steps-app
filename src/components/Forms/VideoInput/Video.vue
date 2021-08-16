<script lang="ts">
import { Vue, Component, Prop, Emit, Ref } from "vue-property-decorator";
import PureButton from "@/components/PureButton/PureButton.vue";
import PureIcon from "@/components/PureIcon/PureIcon.vue";
import VideoModal from "@/components/VideoModal/VideoModal.vue";
import { VideoObject } from "../../../../common/types/VideoObject";

@Component({
  components: {
    VideoModal,
    PureButton,
    PureIcon
  }
})
export default class Video extends Vue {
  @Prop() private title!: string;
  @Prop() private filename!: string;
  @Prop() private url!: string;

  @Ref("videoModal") readonly videoModal!: VideoModal;

  @Emit()
  remove() {}

  get asVideo(): VideoObject {
    return { url: this.url, hash: this.title };
  }
}
</script>

<template>
  <div class="py-2">
    <header class="flex text-sm items-center">
      <strong>{{ title }}</strong>
      <aside class="ml-auto text-sm">
        <PureButton
          role="button"
          feel="ghost"
          @click="videoModal.openModal(asVideo)"
        >
          <PureIcon type="open_in_new" /> Open
        </PureButton>

        <PureButton kind="danger" feel="ghost" @click="remove()">
          Delete
        </PureButton>
      </aside>
    </header>
    <p v-if="filename" class="font-light text-sm">
      Original filename: {{ filename }}
    </p>

    <VideoModal ref="videoModal" />
  </div>
</template>
