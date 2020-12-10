<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

@Component
export default class SessionCartModal extends Vue {
  @Prop() private foo!: string;
}
</script>

<template>
  <div>aa{{ foo }}</div>
</template>
