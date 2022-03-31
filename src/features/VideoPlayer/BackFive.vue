<script lang="ts">
import { defineComponent } from "@vue/composition-api";
import Control from "@/features/VideoPlayer/Control.vue";
import PureIcon from "@/components/PureIcon/PureIcon.vue";

const BackFive = defineComponent({
  components: {
    Control,
    PureIcon
  }
});

export default BackFive;
</script>

<template>
  <Control v-on="$listeners">
    <PureIcon class="text-2xl -mr-2" type="arrow_back_ios" />
  </Control>
</template>
