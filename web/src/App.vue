<template>
  <GlobalStyles>
    <router-view></router-view>
    <ModalContainer />
  </GlobalStyles>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { ComponentOptions } from "vue";
import GlobalStyles from "@/components/GlobalStyles.vue";
import { Inject } from "vue-typedi";
import { AuthService } from "@/lib/firebase/auth.service";
import ModalContainer from "@/components/Modal/ModalContainer.vue";

@Component({
  components: {
    GlobalStyles,
    ModalContainer
  }
})
export default class App extends Vue implements ComponentOptions<Vue> {
  @Inject() private firebaseAuth!: AuthService;

  public async mounted() {
    await this.firebaseAuth.setup();
  }
}
</script>
