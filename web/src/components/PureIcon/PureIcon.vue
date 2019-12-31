<script lang="ts">
import { Prop, Component, Vue } from "vue-property-decorator";

@Component({
  components: {}
})
export default class PureIcon extends Vue {
  @Prop() private type!: string;
}
</script>

<template>
  <i class="material-icons align-middle -mt-px">{{ type }}</i>
</template>
